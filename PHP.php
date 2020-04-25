# zend composer commands

## Built-in PHP web server

php -S 0.0.0.0:8080 -t public public/index.php

## Change development mode

composer development-enable
composer development-status
composer development-disable

## Update autoloading rules

### `config/module.config.php`

```
<?php

namespace Album;

use Zend\ServiceManager\Factory\InvokableFactory;

return [
    'controllers' => [
        'factories' => [
            Controller\AlbumController::class => InvokableFactory::class,
        ],
    ],
    'view_manager' => [
        'template_path_stack' => [
            'album' => __DIR__ . '/../view',
        ],
    ],
];
```

### `composer.json` in "autoload"

```
"autoload": {
    "psr-4": {
        "Application\\": "module/Application/src/",
        "New\\": "module/New/src/"
    }
},
```

`composer dump-autoload`

## Routing and Controllers

### the module's `module.config.php`

```
namespace Album;

use Zend\Router\Http\Segment;
use Zend\ServiceManager\Factory\InvokableFactory;

return [
    'controllers' => [
        'factories' => [
            Controller\AlbumController::class => InvokableFactory::class,
        ],
    ],

    // The following section is new and should be added to your file:
    'router' => [
        'routes' => [
            'album' => [
                'type'    => Segment::class,
                'options' => [
                    'route' => '/album[/:action[/:id]]',
                    'constraints' => [
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ],
                    'defaults' => [
                        'controller' => Controller\AlbumController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
        ],
    ],

    'view_manager' => [
        'template_path_stack' => [
            'album' => __DIR__ . '/../view',
        ],
    ],
];
```

### Create the controller

Create `New/src/Controller/NewController.php`

We are the option to use:

AbstractActionController
AbstractRestfulController


```
namespace Album\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AlbumController extends AbstractActionController
{
    public function indexAction()
    {
    }

    public function addAction()
    {
    }

    public function editAction()
    {
    }

    public function deleteAction()
    {
    }
}
```

## Create a database

### `schema.sql`

```
CREATE TABLE album (id INTEGER PRIMARY KEY AUTOINCREMENT, artist varchar(100) NOT NULL, title varchar(100) NOT NULL);
INSERT INTO album (artist, title) VALUES ('The Military Wives', 'In My Dreams');
INSERT INTO album (artist, title) VALUES ('Adele', '21');
INSERT INTO album (artist, title) VALUES ('Bruce Springsteen', 'Wrecking Ball (Deluxe)');
INSERT INTO album (artist, title) VALUES ('Lana Del Rey', 'Born To Die');
INSERT INTO album (artist, title) VALUES ('Gotye', 'Making Mirrors');
```

### Run the schema script

`sqlite3 data/zftutorial.db < data/schema.sql`

### Create Models

`Album/src/Model/Album.php` is an entity object.

```
<?php

namespace Album\Model;

class Album
{
    public $id;
    public $artist;
    public $title;

    public function exchangeArray(array $data)
    {
        $this->id     = !empty($data['id']) ? $data['id'] : null;
        $this->artist = !empty($data['artist']) ? $data['artist'] : null;
        $this->title  = !empty($data['title']) ? $data['title'] : null;
    }
}
```

`module/Album/src/Model/AlbumTable.php` to work with the `TableGateway` class.

```
<?php

namespace Album\Model;

use RuntimeException;
use Zend\Db\TableGateway\TableGatewayInterface;

class AlbumTable
{
    private $tableGateway;

    public function __construct(TableGatewayInterface $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }

    public function fetchAll()
    {
        return $this->tableGateway->select();
    }

    public function getAlbum($id)
    {
        $id = (int) $id;
        $rowset = $this->tableGateway->select(['id' => $id]);
        $row = $rowset->current();
        if (! $row) {
            throw new RuntimeException(sprintf(
                'Could not find row with identifier %d',
                $id
            ));
        }

        return $row;
    }

    public function saveAlbum(Album $album)
    {
        $data = [
            'artist' => $album->artist,
            'title'  => $album->title,
        ];

        $id = (int) $album->id;

        if ($id === 0) {
            $this->tableGateway->insert($data);
            return;
        }

        try {
            $this->getAlbum($id);
        } catch (RuntimeException $e) {
            throw new RuntimeException(sprintf(
                'Cannot update album with identifier %d; does not exist',
                $id
            ));
        }

        $this->tableGateway->update($data, ['id' => $id]);
    }

    public function deleteAlbum($id)
    {
        $this->tableGateway->delete(['id' => (int) $id]);
    }
}
```

## Using ServiceManager to configure table gateway and inject into the AlbumTable

`Album/src/Module.php`

```
<?php

namespace Album;

use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\ModuleManager\Feature\ConfigProviderInterface;

class Module implements ConfigProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }

    public function getServiceConfig()
    {
        return [
            'factories' => [
                Model\AlbumTable::class => function($container) {
                    $tableGateway = $container->get(Model\AlbumTableGateway::class);
                    return new Model\AlbumTable($tableGateway);
                },
                Model\AlbumTableGateway::class => function ($container) {
                    $dbAdapter = $container->get(AdapterInterface::class);
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Model\Album());
                    return new TableGateway('album', $dbAdapter, null, $resultSetPrototype);
                },
            ],
        ];
    }
}
```

### Update `Global.php`

```
return [
  'db' => [
      'driver' => 'Pdo',
      'dsn'    => sprintf('sqlite:%s/data/zftutorial.db', realpath(getcwd())),
  ],
];
```

### Define factory for Controller

`Album/src/Module.php`

```
    public function getControllerConfig()
    {
        return [
            'factories' => [
                Controller\AlbumController::class => function($container) {
                    return new Controller\AlbumController(
                        $container->get(Model\AlbumTable::class)
                    );
                },
            ],
        ];
    }
```

### Update `AlbumController.php`

```
<?php

namespace Album\Controller;

use Album\Model\AlbumTable;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AlbumController extends AbstractActionController
{
    private $table;

    public function __construct(AlbumTable $table)
    {
        $this->table = $table;
    }

    public function indexAction()
    {
    }

    public function addAction()
    {
    }

    public function editAction()
    {
    }

    public function deleteAction()
    {
    }
}
```

### Update `module.config.php`

```
<?php

namespace Album;

use Zend\Router\Http\Segment;

return [
    'router' => [
        'routes' => [
            'album' => [
                'type'    => Segment::class,
                'options' => [
                    'route' => '/album[/:action[/:id]]',
                    'constraints' => [
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ],
                    'defaults' => [
                        'controller' => Controller\AlbumController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
        ],
    ],

    'view_manager' => [
        'template_path_stack' => [
            'album' => __DIR__ . '/../view',
        ],
    ],
];
```

## Listing Albums

### Update `AlbumController::indexAction()`

```
public function indexAction()
{
    return new ViewModel([
        'albums' => $this->table->fetchAll(),
    ]);
}
```

### Fill out `index.phtml`

```
<?php
// module/Album/view/album/album/index.phtml:

$title = 'My albums';
$this->headTitle($title);
?>
<h1><?= $this->escapeHtml($title) ?></h1>
<p>
    <a href="<?= $this->url('album', ['action' => 'add']) ?>">Add new album</a>
</p>

<table class="table">
<tr>
    <th>Title</th>
    <th>Artist</th>
    <th>&nbsp;</th>
</tr>
<?php foreach ($albums as $album) : ?>
    <tr>
        <td><?= $this->escapeHtml($album->title) ?></td>
        <td><?= $this->escapeHtml($album->artist) ?></td>
        <td>
            <a href="<?= $this->url('album', ['action' => 'edit', 'id' => $album->id]) ?>">Edit</a>
            <a href="<?= $this->url('album', ['action' => 'delete', 'id' => $album->id]) ?>">Delete</a>
        </td>
    </tr>
<?php endforeach; ?>
</table>
```

# Adding new albums

## `module/Album/src/Form/AlbumForm.php`

```
namespace Album\Form;

use Zend\Form\Form;

class AlbumForm extends Form
{
    public function __construct($name = null)
    {
        // We will ignore the name provided to the constructor
        parent::__construct('album');

        $this->add([
            'name' => 'id',
            'type' => 'hidden',
        ]);
        $this->add([
            'name' => 'title',
            'type' => 'text',
            'options' => [
                'label' => 'Title',
            ],
        ]);
        $this->add([
            'name' => 'artist',
            'type' => 'text',
            'options' => [
                'label' => 'Artist',
            ],
        ]);
        $this->add([
            'name' => 'submit',
            'type' => 'submit',
            'attributes' => [
                'value' => 'Go',
                'id'    => 'submitbutton',
            ],
        ]);
    }
}
```

### Form 

HTML forms can be sent using POST and GET. zend-form defaults to POST; therefore you don't have to be explicit in setting this option. If you want to change it to GET however, set the method attribute in the constructor:

```
$this->setAttribute('method', 'GET');
```

### Input Validation in `module/Album/src/Model/Album.php`

```
<?php

namespace Album\Model;

use DomainException;
use Zend\Filter\StringTrim;
use Zend\Filter\StripTags;
use Zend\Filter\ToInt;
use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;
use Zend\Validator\StringLength;

class Album implements InputFilterAwareInterface
{
    public $id;
    public $artist;
    public $title;

    private $inputFilter;

    public function exchangeArray(array $data)
    {
        $this->id     = !empty($data['id']) ? $data['id'] : null;
        $this->artist = !empty($data['artist']) ? $data['artist'] : null;
        $this->title  = !empty($data['title']) ? $data['title'] : null;
    }

    public function setInputFilter(InputFilterInterface $inputFilter)
    {
        throw new DomainException(sprintf(
            '%s does not allow injection of an alternate input filter',
            __CLASS__
        ));
    }

    public function getInputFilter()
    {
        if ($this->inputFilter) {
            return $this->inputFilter;
        }

        $inputFilter = new InputFilter();

        $inputFilter->add([
            'name' => 'id',
            'required' => true,
            'filters' => [
                ['name' => ToInt::class],
            ],
        ]);

        $inputFilter->add([
            'name' => 'artist',
            'required' => true,
            'filters' => [
                ['name' => StripTags::class],
                ['name' => StringTrim::class],
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'encoding' => 'UTF-8',
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
            ],
        ]);

        $inputFilter->add([
            'name' => 'title',
            'required' => true,
            'filters' => [
                ['name' => StripTags::class],
                ['name' => StringTrim::class],
            ],
            'validators' => [
                [
                    'name' => StringLength::class,
                    'options' => [
                        'encoding' => 'UTF-8',
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
            ],
        ]);

        $this->inputFilter = $inputFilter;
        return $this->inputFilter;
    }
}
```

### Display and process on submission in `AlbumController::addAction()`

```
    public function addAction()
    {
        $form = new AlbumForm();
        $form->get('submit')->setValue('Add');

        $request = $this->getRequest();

        if (! $request->isPost()) {
            return ['form' => $form];
        }

        $album = new Album();
        $form->setInputFilter($album->getInputFilter());
        $form->setData($request->getPost());

        if (! $form->isValid()) {
            return ['form' => $form];
        }

        $album->exchangeArray($form->getData());
        $this->table->saveAlbum($album);
        return $this->redirect()->toRoute('album');
    }
```

## Render the form in the `add.phtml`

```
$title = 'Add new album';
$this->headTitle($title);
?>
<h1><?= $this->escapeHtml($title) ?></h1>
<?php
$form->setAttribute('action', $this->url('album', ['action' => 'add']));
$form->prepare();

echo $this->form()->openTag($form);
echo $this->formHidden($form->get('id'));
echo $this->formRow($form->get('title'));
echo $this->formRow($form->get('artist'));
echo $this->formSubmit($form->get('submit'));
echo $this->form()->closeTag();
```

Alternatively, the process of rendering the form can be simplified by using the bundled formCollection view helper. For example, in the view script above replace all the form-rendering echo statements with:

`echo $this->formCollection($form);`

### Updated form with CSS

```
<?php
$title = 'Add new album';
$this->headTitle($title);
?>
<h1><?= $this->escapeHtml($title) ?></h1>
<?php
// This provides a default CSS class and placeholder text for the title element:
$album = $form->get('title');
$album->setAttribute('class', 'form-control');
$album->setAttribute('placeholder', 'Album title');

// This provides a default CSS class and placeholder text for the artist element:
$artist = $form->get('artist');
$artist->setAttribute('class', 'form-control');
$artist->setAttribute('placeholder', 'Artist');

// This provides CSS classes for the submit button:
$submit = $form->get('submit');
$submit->setAttribute('class', 'btn btn-primary');

$form->setAttribute('action', $this->url('album', ['action' => 'add']));
$form->prepare();

echo $this->form()->openTag($form);
?>
<?php // Wrap the elements in divs marked as form groups, and render the
      // label, element, and errors separately within ?>
<div class="form-group">
    <?= $this->formLabel($album) ?>
    <?= $this->formElement($album) ?>
    <?= $this->formElementErrors()->render($album, ['class' => 'help-block']) ?>
</div>

<div class="form-group">
    <?= $this->formLabel($artist) ?>
    <?= $this->formElement($artist) ?>
    <?= $this->formElementErrors()->render($artist, ['class' => 'help-block']) ?>
</div>

<?php
echo $this->formSubmit($submit);
echo $this->formHidden($form->get('id'));
echo $this->form()->closeTag();
```

## Edit an album in `AlbumController.php`

```
    public function editAction()
    {
        $id = (int) $this->params()->fromRoute('id', 0);

        if (0 === $id) {
            return $this->redirect()->toRoute('album', ['action' => 'add']);
        }

        // Retrieve the album with the specified id. Doing so raises
        // an exception if the album is not found, which should result
        // in redirecting to the landing page.
        try {
            $album = $this->table->getAlbum($id);
        } catch (\Exception $e) {
            return $this->redirect()->toRoute('album', ['action' => 'index']);
        }

        $form = new AlbumForm();
        $form->bind($album);
        $form->get('submit')->setAttribute('value', 'Edit');

        $request = $this->getRequest();
        $viewData = ['id' => $id, 'form' => $form];

        if (! $request->isPost()) {
            return $viewData;
        }

        $form->setInputFilter($album->getInputFilter());
        $form->setData($request->getPost());

        if (! $form->isValid()) {
            return $viewData;
        }

        $this->table->saveAlbum($album);

        // Redirect to album list
        return $this->redirect()->toRoute('album', ['action' => 'index']);
    }
```

### Update hydrator object in `module/Album/src/Model/Album.php`

```
    public function getArrayCopy()
    {
        return [
            'id'     => $this->id,
            'artist' => $this->artist,
            'title'  => $this->title,
        ];
    }
```

## Delete album

### Update action `AlbumController::deleteAction()`

```
    public function deleteAction()
    {
        $id = (int) $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toRoute('album');
        }

        $request = $this->getRequest();
        if ($request->isPost()) {
            $del = $request->getPost('del', 'No');

            if ($del == 'Yes') {
                $id = (int) $request->getPost('id');
                $this->table->deleteAlbum($id);
            }

            // Redirect to list of albums
            return $this->redirect()->toRoute('album');
        }

        return [
            'id'    => $id,
            'album' => $this->table->getAlbum($id),
        ];
    }
```

### Update `delete.phtml`

```
$title = 'Delete album';
$url   = $this->url('album', ['action' => 'delete', 'id' => $id]);

$this->headTitle($title);
?>
<h1><?= $this->escapeHtml($title) ?></h1>

<p>
    Are you sure that you want to delete
    "<?= $this->escapeHtml($album->title) ?>" by
    "<?= $this->escapeHtml($album->artist) ?>"?
</p>

<form action="<?= $url ?>" method="post">
<div class="form-group">
    <input type="hidden" name="id" value="<?= (int) $album->id ?>" />
    <input type="submit" class="btn btn-danger" name="del" value="Yes" />
    <input type="submit" class="btn btn-success" name="del" value="No" />
</div>
</form>
```

## Ensuring that the home page displays the list of albums

`module/Application/config/module.config.php`

```
use Album\Controller\AlbumController;
...

'home' => [
    'type' => \Zend\Router\Http\Literal::class,
    'options' => [
        'route'    => '/',
        'defaults' => [
            'controller' => AlbumController::class, // <-- change here
            'action'     => 'index',
        ],
    ],
],
```

---
# PHP

The PHP Hypertext Preprocessor (PHP) is a programming language that allows web developers to create dynamic content that interacts with databases.

<html>   
   <head>
      <title>Hello World</title>
   </head>
   
   <body>
      <?php echo "Hello, World!";?>
   </body>
</html>


PHP is a recursive acronym for "PHP: Hypertext Preprocessor".

PHP is a server side scripting language that is embedded in HTML. It is used to manage dynamic content, databases, session tracking, even build entire e-commerce sites.

It is integrated with a number of popular databases, including MySQL, PostgreSQL, Oracle, Sybase, Informix, and Microsoft SQL Server.

PHP is pleasingly zippy in its execution, especially when compiled as an Apache module on the Unix side. The MySQL server, once started, executes even very complex queries with huge result sets in record-setting time.

PHP supports a large number of major protocols such as POP3, IMAP, and LDAP. PHP4 added support for Java and distributed object architectures (COM and CORBA), making n-tier development a possibility for the first time.

PHP is forgiving: PHP language tries to be as forgiving as possible.

PHP Syntax is C-Like.



Common uses of PHP

	PHP performs system functions, i.e. from files on a system it can create, open, read, write, and close them.

	PHP can handle forms, i.e. gather data from files, save data to a file, through email you can send data, return data to the user.

	You add, delete, modify elements within your database through PHP.

	Access cookies variables and set cookies.

	Using PHP, you can restrict users to access some pages of your website.

	It can encrypt data.



Using PHP

	<?php 
		echo "<h1>Hello, PHP!</h1>";
	?>

	<?    
		echo "<h1>Hello, PHP!</h1>";
	?>

	<script language="php"> 
		echo "<h1>Hello, PHP!</h1>";
	</script>



/* -------------------------------------------------- */
	Syntax
/* -------------------------------------------------- */

Escaping to PHP

	The PHP parsing engine needs a way to differentiate PHP code from other elements in the page. The mechanism for doing so is known as 'escaping to PHP'.

Canonical PHP tags

	<?php...?>

Short-open (SGML-style) tags	

	<?...?>

		Choose the --enable-short-tags configuration option when you're building PHP.

		Set the short_open_tag setting in your php.ini file to on. This option must be disabled to parse XML with PHP because the same syntax is used for XML tags.

ASP-style tags

	<%...%>

		ASP-style tags mimic the tags used by Active Server Pages to delineate code blocks. ASP-style tags look like this −


HTML script tags

	<script language="PHP">...</script>



Commenting PHP Code

	<?
		# This is a comment, and
		# This is the second line of the comment
		
		// This is a comment too. Each style comments only
		print "An example with single line comments";
	?>


Multi-line printing

	<?
		# First Example
		/*
		print <<<END
		This uses the "here document" syntax to output
		multiple lines with $variable interpolation. Note
		that the here document terminator must appear on a
		line with just a semicolon no extra whitespace!
		END;
		*/

		# Second Example
		print "This spans
		multiple lines. The newlines will be
		output as well";
	?>

Multi-line comments

	<?
		/* This is a comment with multiline
			Author : Mohammad Mohtashim
			Purpose: Multiline Comments Demo
			Subject: PHP
		*/		
		print "An example with multi line comments";
	?>



PHP is whitespace insensitive

	Whitespace is the stuff you type that is typically invisible on the screen, including spaces, tabs, and carriage returns (end-of-line characters).

	<?
		$four = 2 + 2; // single spaces
		$four <tab>=<tab2<tab>+<tab>2 ; // spaces and tabs
		$four =
		2+
		2; // multiple lines
	?>


PHP is case sensitive

	<?php
		$capital = 67;
		print("Variable capital is $capital<br>");
		print("Variable CaPiTaL is $CaPiTaL<br>");
		# Variable capital is 67
		# Variable CaPiTaL is
	?>



Statements are expressions terminated by semicolons

	$greeting = "Welcome to PHP!";



Expressions are combinations of tokens

	The smallest building blocks of PHP are the indivisible tokens, such as numbers (3.14159), strings (.two.), variables ($two), constants (TRUE), and the special words that make up the syntax of PHP itself like if, else, while, for and so forth.



Braces make blocks

	<?
		if (3 == 2 + 1)
			print("Good - I haven't totally lost my mind.<br>");
		
		if (3 == 2 + 1) {
			print("Good - I haven't totally");
			print("lost my mind.<br>");
		}
	?>



/* -------------------------------------------------- */
	Variable Types
/* -------------------------------------------------- */

All variables in PHP are denoted with a leading dollar sign ($).

The value of a variable is the value of its most recent assignment.

Variables are assigned with the = operator, with the variable on the left-hand side and the expression to be evaluated on the right.

Variables can, but do not need, to be declared before assignment.

Variables in PHP do not have intrinsic types - a variable does not know in advance whether it will be used to store a number or a string of characters.

Variables used before they are assigned have default values.

PHP does a good job of automatically converting types from one to another when necessary.



<?

	#Integers

		# They are whole numbers, without a decimal point, like 4195. They are the simplest type .they correspond to simple whole numbers, both positive and negative.

		# Integer can be in decimal (base 10), octal (base 8), and hexadecimal (base 16) format. Decimal format is the default, octal integers are specified with a leading 0, and hexadecimals have a leading 0x.
	
		$int_var = 12345;
		$another_int = -12345 + 12345;

		# For most common platforms, the largest integer is (2**31 . 1) (or 2,147,483,647), and the smallest (most negative) integer is . (2**31 . 1) (or .2,147,483,647).



	# Doubles

		# They like 3.14159 or 49.1. By default, doubles print with the minimum number of decimal places needed.

		$many = 2.2888800;
		$many_2 = 2.2111200;
		$few = $many + $many_2;
		
		print("$many + $many_2 = $few <br>");
		# 2.28888 + 2.21112 = 4.5
		


	# Boolean

		# They have only two possible values either true or false. PHP provides a couple of constants especially for use as Booleans: TRUE and FALSE

		if (TRUE)
			print("This will always print<br>");

		else
			print("This will never print<br>");		

		/*
		If the value is a number, it is false if exactly equal to zero and true otherwise.

		If the value is a string, it is false if the string is empty (has zero characters) or is the string "0", and is true otherwise.

		Values of type NULL are always false.

		If the value is an array, it is false if it contains no other values, and it is true otherwise. For an object, containing a value means having a member variable that has been assigned a value.

		Valid resources are true (although some functions that return resources when they are successful will return FALSE when unsuccessful).

		Don't use double as Booleans.
		*/

		$true_num = 3 + 0.14159;
		$true_str = "Tried and true";
		$true_array[49] = "An array element";
		$false_array = array();
		$false_null = NULL;
		$false_num = 999 - 999;
		$false_str = "";		



	# NULL

		# NULL is a special type that only has one value: NULL. The special constant NULL is capitalized by convention, but actually it is case insensitive.

		$my_var = NULL;
		$my_var = null;

		/* 
		A variable that has been assigned NULL has the following properties 

			It evaluates to FALSE in a Boolean context.
			It returns FALSE when tested with IsSet() function.
		*/



	# String

		$string_1 = "This is a string in double quotes";
		$string_2 = 'This is a somewhat longer, singly quoted string';
		$string_39 = "This string has thirty-nine characters";
		$string_0 = ""; // a string with zero characters	

		# Singly quoted strings are treated almost literally, whereas doubly quoted strings replace variables with their values as well as specially interpreting certain character sequences.

		$variable = "name";
		$literally = 'My $variable will not print!';
		
		print($literally); # My $variable will not print!\n
		print "<br>";
		
		$literally = "My $variable will print!";
		print($literally); # My name will print

		/*
		Strings that are delimited by double quotes (as in "this") are preprocessed in both the following two ways by PHP

			Certain character sequences beginning with backslash (\) are replaced with special characters

			Variable names (starting with $) are replaced with string representations of their values.
		*/

		/* 
		Escape-sequence

			\n is replaced by the newline character
			\r is replaced by the carriage-return character
			\t is replaced by the tab character
			\$ is replaced by the dollar sign itself ($)
			\" is replaced by a single double-quote (")
			\\ is replaced by a single backslash (\)
		*/



	# Here Document

$channel =<<<_XML_   
   <channel>
      <title>What's For Dinner</title>
      <link>http://menu.example.com/ </link>
      <description>Choose what to eat tonight.</description>
   </channel>
_XML_;   
   echo <<<END
   This uses the "here document" syntax to output multiple lines with variable 
   interpolation. Note that the here document terminator must appear on a line with 
   just a semicolon. no extra whitespace!   
END;
   print $channel;
/*
This uses the "here document" syntax to output
multiple lines with variable interpolation. Note
that the here document terminator must appear on a
line with just a semicolon. no extra whitespace!

<channel>
<title>What's For Dinner<title>
<link>http://menu.example.com/<link>
<description>Choose what to eat tonight.</description>
*/

?>


Variable Naming

	Variable names must begin with a letter or underscore character.

	A variable name can consist of numbers, letters, underscores but you cannot use characters like + , - , % , ( , ) . & , etc



/* -------------------------------------------------- */
	Constant Types
/* -------------------------------------------------- */

A constant is a name or an identifier for a simple value. A constant value cannot change during the execution of the script. By default, a constant is case-sensitive. By convention, constant identifiers are always uppercase. A constant name starts with a letter or underscore, followed by any number of letters, numbers, or underscores. If you have defined a constant, it can never be changed or undefined.

To define a constant you have to use define() function and to retrieve the value of a constant, you have to simply specifying its name. Unlike with variables, you do not need to have a constant with a $. You can also use the function constant() to read a constant's value if you wish to obtain the constant's name dynamically.


constant() function

	As indicated by the name, this function will return the value of the constant.

	<?php
		define("MINSIZE", 50);
		
		echo MINSIZE;
		echo constant("MINSIZE"); // same thing as the previous line
	?>



Difference between constants and variable

	There is no need to write a dollar sign ($) before a constant, where as in Variable one has to write a dollar sign.

	Constants cannot be defined by simple assignment, they may only be defined using the define() function.

	Constants may be defined and accessed anywhere without regard to variable scoping rules.

	Once the Constants have been set, may not be redefined or undefined.

	<?
		// Valid constant names
		define("ONE",     "first thing");
		define("TWO2",    "second thing");
		define("THREE_3", "third thing");

		// Invalid constant names
		define("2TWO",    "second thing");
		define("__THREE__", "third value"); 
	?>



PHP Magic constants

	PHP provides a large number of predefined constants to any script which it runs.

	There are five magical constants that change depending on where they are used. For example, the value of __LINE__ depends on the line that it's used on in your script. These special constants are case-insensitive.

	__LINE__
		The current line number of the file.

	__FILE__
		The full path and filename of the file. If used inside an include,the name of the included file is returned. Since PHP 4.0.2, __FILE__ always contains an absolute path whereas in older versions it contained relative path under some circumstances.

	__FUNCTION__
		The function name. (Added in PHP 4.3.0) As of PHP 5 this constant returns the function name as it was declared (case-sensitive). In PHP 4 its value is always lowercased.

	__CLASS__
		The class name. (Added in PHP 4.3.0) As of PHP 5 this constant returns the class name as it was declared (case-sensitive). In PHP 4 its value is always lowercased.

	__METHOD__
		The class method name. (Added in PHP 5.0.0) The method name is returned as it was declared (case-sensitive).



/* -------------------------------------------------- */
	Operator Types
/* -------------------------------------------------- */

What is Operator? Simple answer can be given using expression 4 + 5 is equal to 9. Here 4 and 5 are called operands and + is called operator. PHP language supports following type of operators.



Arithmetic Operators

	+	
		Adds two operands	
		A + B will give 30

	-	
		Subtracts second operand from the first	
		A - B will give -10

	*	
		Multiply both operands	
		A * B will give 200

	/	
		Divide numerator by de-numerator	
		B / A will give 2

	%	
		Modulus Operator and remainder of after an integer division	
		B % A will give 0

	++	
		Increment operator, increases integer value by one	
		A++ will give 11

	--	
		Decrement operator, decreases integer value by one	
		A-- will give 9



Comparison Operators

	==	
		Checks if the value of two operands are equal or not, if yes then condition becomes true.	
		(A == B) is not true.

	!=	
		Checks if the value of two operands are equal or not, if values are not equal then condition becomes true.	
		(A != B) is true.

	>	
		Checks if the value of left operand is greater than the value of right operand, if yes then condition becomes true.	
		(A > B) is not true.

	<	
		Checks if the value of left operand is less than the value of right operand, if yes then condition becomes true.	
		(A < B) is true.

	>=	
		Checks if the value of left operand is greater than or equal to the value of right operand, if yes then condition becomes true.	
		(A >= B) is not true.

	<=	
		Checks if the value of left operand is less than or equal to the value of right operand, if yes then condition becomes true.	
		(A <= B) is true.



Logical Operators

	and	
		Called Logical AND operator. If both the operands are true then condition becomes true.	
		(A and B) is true.

	or	
		Called Logical OR Operator. If any of the two operands are non zero then condition becomes true.	
		(A or B) is true.

	&&	
		Called Logical AND operator. If both the operands are non zero then condition becomes true.	
		(A && B) is true.
	
	||	
		Called Logical OR Operator. If any of the two operands are non zero then condition becomes true.	
		(A || B) is true.

	!	
		Called Logical NOT Operator. Use to reverses the logical state of its operand. If a condition is true then Logical NOT operator will make false.	
		!(A && B) is false.


Assignment Operators

	=	
		Simple assignment operator, Assigns values from right side operands to left side operand	
		C = A + B will assign value of A + B into C
	
	+=	
		Add AND assignment operator, It adds right operand to the left operand and assign the result to left operand	
		C += A is equivalent to C = C + A
	
	-=	
		Subtract AND assignment operator, It subtracts right operand from the left operand and assign the result to left operand	
		C -= A is equivalent to C = C - A
	
	*=	
		Multiply AND assignment operator, It multiplies right operand with the left operand and assign the result to left operand	
		C *= A is equivalent to C = C * A
	
	/=	
		Divide AND assignment operator, It divides left operand with the right operand and assign the result to left operand	
		C /= A is equivalent to C = C / A
	
	%=	
		Modulus AND assignment operator, It takes modulus using two operands and assign the result to left operand	
		C %= A is equivalent to C = C % A



Conditional Operators

	? :	
		Conditional Expression	
		If Condition is true ? Then value X : Otherwise value Y



Precedence of PHP Operators

	Unary	
		! ++ --	
		Right to left

	Multiplicative	
		* / %	
		Left to right

	Additive
		+ -	
		Left to right

	Relational	
		< <= > >=	
		Left to right
	
	Equality	
		== !=	
		Left to right
	
	Logical AND	
		&&	
		Left to right
	
	Logical OR
		||	
		Left to right
	
	Conditional	
		?:	
		Right to left
	
	Assignment	
		= += -= *= /= %=	
		Right to left



/* -------------------------------------------------- */
	Decision Making
/* -------------------------------------------------- */

<?
	# If...Else Statement
		$d = date("D");
		
		if ($d == "Fri")
			echo "Have a nice weekend!";

		else
			echo "Have a nice day!";

	
	# Elseif Statement
		$d = date("D");
		
		if ($d == "Fri")
			echo "Have a nice weekend!";
		
		elseif ($d == "Sun")
			echo "Have a nice Sunday!"; 
		
		else
			echo "Have a nice day!"; 	


	#Switch Statement
         $d = date("D");
         
        switch ($d){
            case "Mon":
               echo "Today is Monday";
               break;
            
            case "Tue":
               echo "Today is Tuesday";
               break;
            
            case "Wed":
               echo "Today is Wednesday";
               break;
            
            case "Thu":
               echo "Today is Thursday";
               break;
            
            case "Fri":
               echo "Today is Friday";
               break;
            
            case "Sat":
               echo "Today is Saturday";
               break;
            
            case "Sun":
               echo "Today is Sunday";
               break;
            
            default:
               echo "Wonder which day is this ?";
		}
?>



/* -------------------------------------------------- */
	Loop Types
/* -------------------------------------------------- */

<?
	# for loop
		for( $i = 0; $i<5; $i++ ) {
			print "Hello";
		}


	# while
		$i = 0;
		while ( $i < 10) {
			print "Hello";
			$i++;
		}


	# do while
		$i = 0;
		do {
			print "Hello";
			$i++;
		}
		while ( $i < 10 );


	# foreach
		$array = array( 1, 2, 3, 4, 5);

		foreach( $array as $value ) {
			echo "Value is $value"<br />;
		}


	# Break statement
		$i = 0;
		
		while( $i < 10) {
			$i++;
			if( $i == 3 )break;
		}
		echo ("Loop stopped at i = $i" ); 
		# Loop stopped at i = 3

	
	# Continue statement
		$array = array( 1, 2, 3, 4, 5);
		
		foreach( $array as $value ) {
			if( $value == 3 )continue;
			echo "Value is $value <br />";
		}

		# The PHP continue keyword is used to halt the current iteration of a loop but it does not terminate the loop.


?>


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */



<?php	
	global $current_user;
	get_currentuserinfo();

	echo 'Username: ' . $current_user->user_login . "\n";
	echo 'User email: ' . $current_user->user_email . "\n";
	echo 'User level: ' . $current_user->user_level . "\n";
	//echo 'User first name: ' . $current_user->user_firstname . "\n";
	//echo 'User last name: ' . $current_user->user_lastname . "\n";
	//echo 'User display name: ' . $current_user->display_name . "\n";
	//echo 'User ID: ' . $current_user->ID . "\n";

	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT ID, EMAIL FROM USER";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        echo "ID: " . $row["ID"]. " - EMAIL: " . $row["EMAIL"]. "<br>";
	    }
	} else {
	    echo "0 results";
	}
	$conn->close();









	global $current_user;
	get_currentuserinfo();

	$email = $current_user->user_email;

	//Database Information
	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT " .
			  "PROGRAM.NAME AS PROGRAM, " .
			  "CONCAT(LOCATION.NAME,' @', LOCATION.ADDRESS) AS LOCATION, " .
			  "WAITLIST.QUEUE AS 'WAITLIST POSITION' " .  
			"FROM USER " .
			  "INNER JOIN WAITLIST ON WAITLIST.USER_ID = USER.ID " . 
			  "INNER JOIN PROGRAM ON PROGRAM.ID = WAITLIST.PROGRAM_ID " .
			  "INNER JOIN LOCATION ON LOCATION.ID = PROGRAM.LOCATION_ID " .
			"WHERE " .
			  "EMAIL = " .  "'" . $email . "'";

	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        echo "<br> " . $row["PROGRAM"] . " " . $row["LOCATION"] . "<br>Waitlist Position: " . $row["WAITLIST POSITION"]. "<br><br>";
	    }
	} else {
	    echo "You are not on a waitlist.";
	}
	$conn->close();





?>


<?php


	//Database Information
	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 



	$sql = "SELECT " .
			  "EMAIL, " .
			  "QUEUE, " .
			  "PROGRAM, " .
			  "LOCATION " .
			"FROM WAITLIST_VIEW";

	$result = $conn->query($sql);

	$email = ""; 
	$program = "";
	$location = "";
	$queue = "";

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        $email = $row["EMAIL"];
	        $program = $row["PROGRAM"];
	        $location = $row["LOCATION"];
	        $queue = $row["QUEUE"];

	        //send email
			$to      = $email;
			$subject = $program . " Waitlist";
			$message = "Hello," . "\r\n" . "There is an opening for " . $program . " " . $location;
			$headers = 'From: webmaster@example.com' . "\r\n" .
			'Reply-To: webmaster@example.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();

			mail($to, $subject, $message, $headers);
	    }
	}
	$conn->close();
?>


<?php

	global $current_user;
	get_currentuserinfo();

	$email = $current_user->user_email;

	//Database Information
	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "UPDATE WAITLIST " .
				"SET CONFIRMED = 1, QUEUE = NULL " .
			"WHERE " .
				"QUEUE = 1 ";

	$conn->query($sql);

	$sql = "SELECT 1 " .
			"FROM USER " .
			  "INNER JOIN WAITLIST ON WAITLIST.USER_ID = USER.ID " . 
			  "INNER JOIN PROGRAM ON PROGRAM.ID = WAITLIST.PROGRAM_ID " .
			  "INNER JOIN LOCATION ON LOCATION.ID = PROGRAM.LOCATION_ID " .
			"WHERE " .
			  "EMAIL = " .  "'" . $email . "'" .
			  "AND CONFIRMED = 1 " . 
			  "AND WAITLIST.QUEUE IS NULL ";

	$result = $conn->query($sql);

	if ($result->num_rows == 0) {
		echo "Enrollment confirmed.";
	} else {
		echo "Enrollment failed.";
	}

	$conn->close();

?>
