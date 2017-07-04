/* -------------------------------------------------------- */
    Java
/* -------------------------------------------------------- */

Java programming language was originally developed by Sun Microsystems which was initiated by James Gosling and released in 1995 as core component of Sun Microsystems Java platform (Java 1.0 [J2SE]).

The latest release of the Java Standard Edition is Java SE 8. With the advancement of Java and its widespread popularity, multiple configurations were built to suit various types of platforms. For example: J2EE for Enterprise Applications, J2ME for Mobile Applications.

The new J2 versions were renamed as Java SE, Java EE, and Java ME respectively. Java is guaranteed to be Write Once, Run Anywhere.




Object Oriented
    
    In Java, everything is an Object. Java can be easily extended since it is based on the Object model.


Platform Independent

    Unlike many other programming languages including C and C++, when Java is compiled, it is not compiled into platform specific machine, rather into platform independent byte code. This byte code is distributed over the web and interpreted by the Virtual Machine (JVM) on whichever platform it is being run on.


Simple

    Java is designed to be easy to learn. If you understand the basic concept of OOP Java, it would be easy to master.


Secure

    With Javas secure feature it enables to develop virus-free, tamper-free systems. Authentication techniques are based on public-key encryption.


Architecture-neutral

    Java compiler generates an architecture-neutral object file format, which makes the compiled code executable on many processors, with the presence of Java runtime system.


Portable

    Being architecture-neutral and having no implementation dependent aspects of the specification makes Java portable. Compiler in Java is written in ANSI C with a clean portability boundary, which is a POSIX subset.


Robust

    Java makes an effort to eliminate error prone situations by emphasizing mainly on compile time error checking and runtime checking.


Multithreaded

    With Javas multithreaded feature it is possible to write programs that can perform many tasks simultaneously. This design feature allows the developers to construct interactive applications that can run smoothly.


Interpreted

    Java byte code is translated on the fly to native machine instructions and is not stored anywhere. The development process is more rapid and analytical since the linking is an incremental and light-weight process.


High Performance

    With the use of Just-In-Time compilers, Java enables high performance.


Distributed

    Java is designed for the distributed environment of the internet.


Dynamic

    Java is considered to be more dynamic than C or C++ since it is designed to adapt to an evolving environment. Java programs can carry extensive amount of run-time information that can be used to verify and resolve accesses to objects on run-time.


/* -------------------------------------------------------- */
    Basic Syntax
/* -------------------------------------------------------- */

// Concepts
Object

    Objects have states and behaviors. Example: A dog has states - color, name, breed as well as behavior such as wagging their tail, barking, eating. An object is an instance of a class.


Class 

    A class can be defined as a template/blueprint that describes the behavior/state that the object of its type supports.


Methods

    A method is basically a behavior. A class can contain many methods. It is in methods where the logics are written, data is manipulated and all the actions are executed.


Instance Variables

    Each object has its unique set of instance variables. An object's state is created by the values assigned to these instance variables.


// Syntax
Case Sensitivity

	Java is case sensitive, which means identifier Hello and hello would have different meaning in Java.


Class Names

	For all class names the first letter should be in Upper Case. If several words are used to form a name of the class, each inner word's first letter should be in Upper Case.

	Example: class MyFirstJavaClass


Method Names

	All method names should start with a Lower Case letter. If several words are used to form the name of the method, then each inner word's first letter should be in Upper Case.

	Example: public void myMethodName()


Program File Name

	Name of the program file should exactly match the class name.

	When saving the file, you should save it using the class name (Remember Java is case sensitive) and append '.java' to the end of the name (if the file name and the class name do not match, your program will not compile).

	Example: Assume 'MyFirstJavaProgram' is the class name. Then the file should be saved as 'MyFirstJavaProgram.java'


public static void main(String args[])

	Java program processing starts from the main() method which is a mandatory part of every Java program.


/* -------------------------------------------------------- */
	Identifiers
/* -------------------------------------------------------- */

All identifiers should begin with a letter (A to Z or a to z), currency character ($) or an underscore (_).

After the first character, identifiers can have any combination of characters.

A key word cannot be used as an identifier.

Most importantly, identifiers are case sensitive.

Examples of legal identifiers: age, $salary, _value, __1_value.

Examples of illegal identifiers: 123abc, -salary.


/* -------------------------------------------------------- */
	Modifiers
/* -------------------------------------------------------- */

Access Modifiers

	default, public , protected, private

Non-access Modifiers

	final, abstract, strictfp


/* -------------------------------------------------------- */
	Variables
/* -------------------------------------------------------- */

Local Variables

Class Variables (Static Variables)

Instance Variables (Non-static Variables)


/* -------------------------------------------------------- */
	Enums
/* -------------------------------------------------------- */

Enums restrict a variable to have one of only a few predefined values.

class FreshJuice {
   enum FreshJuiceSize{ SMALL, MEDIUM, LARGE }
   FreshJuiceSize size;
}

public class FreshJuiceTest {

   public static void main(String args[]) {
      FreshJuice juice = new FreshJuice();
      juice.size = FreshJuice.FreshJuiceSize.MEDIUM;
      System.out.println("Size: " + juice.size); // Size: Medium
   }
}

/* -------------------------------------------------------- */
	Keywords
/* -------------------------------------------------------- */

/*
abstract	
assert	
boolean	
break
byte	
case	
catch	
char
class	
const	
continue	
default
do	
double	
else	
enum
extends	
final	
finally	
float
for	
goto
if	
implements
import	
instanceof	
int	
interface
long	
native	
new	
package
private	
protected	
public	
return
short	
static	
strictfp	
super
switch	
synchronized	
this	
throw
throws	
transient	
try	
void
volatile	
while	
*/


/* -------------------------------------------------------- */
	Inheritance
/* -------------------------------------------------------- */

In Java, classes can be derived from classes. Basically, if you need to create a new class and here is already a class that has some of the code you require, then it is possible to derive your new class from the already existing code.

This concept allows you to reuse the fields and methods of the existing class without having to rewrite the code in a new class. In this scenario, the existing class is called the superclass and the derived class is called the subclass.


/* -------------------------------------------------------- */
	Interfaces
/* -------------------------------------------------------- */

In Java language, an interface can be defined as a contract between objects on how to communicate with each other. Interfaces play a vital role when it comes to the concept of inheritance.

An interface defines the methods, a deriving class (subclass) should use. But the implementation of the methods is totally up to the subclass.


/* -------------------------------------------------------- */
	Object and Classes
/* -------------------------------------------------------- */

// Suported concepts
Polymorphism
Inheritance
Encapsulation
Abstraction
Classes
Objects
Instance
Method
Message Parsing


/* -------------------------------------------------------- */
	Classes
/* -------------------------------------------------------- */

A class is a blueprint from which individual objects are created.

// Example
public class Dog {
   String breed;
   int age;
   String color;

   void barking() {
   }

   void hungry() {
   }

   void sleeping() {
   }
}


// Class can contain
Local variables

	Variables defined inside methods, constructors or blocks are called local variables. The variable will be declared and initialized within the method and the variable will be destroyed when the method has completed.


Instance variables

	Instance variables are variables within a class but outside any method. These variables are initialized when the class is instantiated. Instance variables can be accessed from inside any method, constructor or blocks of that particular class.


Class variables

	Class variables are variables declared within a class, outside any method, with the static keyword.



//Constructors
Every class has a constructor. If we do not explicitly write a constructor for a class, the Java compiler builds a default constructor for that class.

Each time a new object is created, at least one constructor will be invoked. The main rule of constructors is that they should have the same name as the class. A class can have more than one constructor.

// Example
public class Puppy {
   public Puppy() {
   }

   public Puppy(String name) {
      // This constructor has one parameter, name.
   }
}


// Singleton Classes
Singleton Classes

	Where you would be able to create only one instance of a class.


/* -------------------------------------------------------- */
	Creating an Object
/* -------------------------------------------------------- */

Declaration

	A variable declaration with a variable name with an object type.


Instantiation

	The 'new' keyword is used to create the object.


Initialization

	The 'new' keyword is followed by a call to a constructor. This call initializes the 'new' object.

// Example
public class Puppy {
	public Puppy(String name) {
		// This constructor has one parameter, name.
		System.out.println("Passed Name is :" + name );
	}

	public static void main(String []args) {
		// Following statement would create an object myPuppy
		Puppy myPuppy = new Puppy( "tommy" );
	}
}


// Accessing instance variable and methods

	/* First create an object */
	ObjectReference = new Constructor();

	/* Now call a variable as follows */
	ObjectReference.variableName;

	/* Now you can call a class method as follows */
	ObjectReference.MethodName();


// Example
public class Puppy {
   int puppyAge;

   public Puppy(String name) {
      // This constructor has one parameter, name.
      System.out.println("Name chosen is :" + name );
   }

   public void setAge( int age ) {
      puppyAge = age;
   }

   public int getAge( ) {
      System.out.println("Puppy's age is :" + puppyAge );
      return puppyAge;
   }

   public static void main(String []args) {
      /* Object creation */
      Puppy myPuppy = new Puppy( "tommy" );

      /* Call class method to set puppy's age */
      myPuppy.setAge( 2 );

      /* Call another class method to get puppy's age */
      myPuppy.getAge( );

      /* You can access instance variable as follows as well */
      System.out.println("Variable Value :" + myPuppy.puppyAge );
   }
}


/* -------------------------------------------------------- */
	Source file declaration rules
/* -------------------------------------------------------- */

There can be only one public class per source file.

A source file can have multiple non-public classes.

The public class name should be the name of the source file as well which should be appended by .java at the end. For example: the class name is public class Employee{} then the source file should be as Employee.java.

If the class is defined inside a package, then the package statement should be the first statement in the source file.

If import statements are present, then they must be written between the package statement and the class declaration. If there are no package statements, then the import statement should be the first line in the source file.

Import and package statements will imply to all the classes present in the source file. It is not possible to declare different import and/or package statements to different classes in the source file.



// Package
In simple words, it is a way of categorizing the classes and interfaces. When developing applications in Java, hundreds of classes and interfaces will be written, therefore categorizing these classes is a must as well as makes life much easier.


// Import statements
In Java if a fully qualified name, which includes the package and the class name is given, then the compiler can easily locate the source code or classes. Import statement is a way of giving the proper location for the compiler to find that particular class.

The following line would ask the compiler to load all the classes available in directory java_installation/java/io −

import java.io.*;


/* -------------------------------------------------------- */
	Basic Datatypes

/* -------------------------------------------------------- */

Variables are nothing but reserved memory locations to store values. This means that when you create a variable you reserve some space in the memory.

Based on the data type of a variable, the operating system allocates memory and decides what can be stored in the reserved memory. Therefore, by assigning different data types to variables, you can store integers, decimals, or characters in these variables.


// Two data types in Java
Primitive Data Types
Reference/Object Data Types


Primitive data types

	There are eight primitive datatypes supported by Java. Primitive datatypes are predefined by the language and named by a keyword. Let us now look into the eight primitive data types in detail.


	byte

		Byte data type is an 8-bit signed two's complement integer

		Minimum value is -128 (-2^7)

		Maximum value is 127 (inclusive)(2^7 -1)

		Default value is 0

		Byte data type is used to save space in large arrays, mainly in place of integers, since a byte is four times smaller than an integer.

		Example: byte a = 100, byte b = -50	


	short

		Short data type is a 16-bit signed two's complement integer

		Minimum value is -32,768 (-2^15)

		Maximum value is 32,767 (inclusive) (2^15 -1)

		Short data type can also be used to save memory as byte data type. A short is 2 times smaller than an integer

		Default value is 0.

		Example: short s = 10000, short r = -20000


	int

		Int data type is a 32-bit signed two's complement integer.

		Minimum value is - 2,147,483,648 (-2^31)

		Maximum value is 2,147,483,647(inclusive) (2^31 -1)

		Integer is generally used as the default data type for integral values unless there is a concern about memory.

		The default value is 0

		Example: int a = 100000, int b = -200000


	long

		Long data type is a 64-bit signed two's complement integer

		Minimum value is -9,223,372,036,854,775,808(-2^63)

		Maximum value is 9,223,372,036,854,775,807 (inclusive)(2^63 -1)

		This type is used when a wider range than int is needed

		Default value is 0L

		Example: long a = 100000L, long b = -200000L


	float

		Float data type is a single-precision 32-bit IEEE 754 floating point

		Float is mainly used to save memory in large arrays of floating point numbers

		Default value is 0.0f

		Float data type is never used for precise values such as currency

		Example: float f1 = 234.5f


	double

		double data type is a double-precision 64-bit IEEE 754 floating point

		This data type is generally used as the default data type for decimal values, generally the default choice

		Double data type should never be used for precise values such as currency

		Default value is 0.0d

		Example: double d1 = 123.4


	boolean

		boolean data type represents one bit of information

		There are only two possible values: true and false

		This data type is used for simple flags that track true/false conditions

		Default value is false

		Example: boolean one = true


	char

		char data type is a single 16-bit Unicode character
		
		Minimum value is '\u0000' (or 0)
		
		Maximum value is '\uffff' (or 65,535 inclusive)
		
		Char data type is used to store any character
		
		Example: char letterA = 'A'


// Reference Datatypes

	Reference variables are created using defined constructors of the classes. They are used to access objects. These variables are declared to be of a specific type that cannot be changed. For example, Employee, Puppy, etc.

	Class objects and various type of array variables come under reference datatype.

	Default value of any reference variable is null.

	A reference variable can be used to refer any object of the declared type or any compatible type.

	Example: Animal animal = new Animal("giraffe");		


// Literals

	A literal is a source code representation of a fixed value. They are represented directly in the code without any computation.

	byte a = 68;
	char a = 'A'

	// Prefix 0 is used to indicate octal, and prefix 0x indicates hexadecimal
	int decimal = 100;
	int octal = 0144;
	int hexa =  0x64;

	// String literals
	"Hello World"
	"two\nlines"
	"\"This is in quotes\""

	// Unicode characters in String literal
	char a = '\u0001';
	String a = "\u0001";


	// Escape sequence for string and char
	\n	Newline (0x0a)
	\r	Carriage return (0x0d)
	\f	Formfeed (0x0c)
	\b	Backspace (0x08)
	\s	Space (0x20)
	\t	tab
	\"	Double quote
	\'	Single quote
	\\	backslash
	\ddd	Octal character (ddd)
	\uxxxx	Hexadecimal UNICODE character (xxxx)


/* -------------------------------------------------------- */
	Variable Types
/* -------------------------------------------------------- */

A variable provides us with named storage that our programs can manipulate. Each variable in Java has a specific type, which determines the size and layout of the variable's memory; the range of values that can be stored within that memory; and the set of operations that can be applied to the variable.


// Local variables

	Local variables are declared in methods, constructors, or blocks.

	Local variables are created when the method, constructor or block is entered and the variable will be destroyed once it exits the method, constructor, or block.

	Access modifiers cannot be used for local variables.

	Local variables are visible only within the declared method, constructor, or block.

	Local variables are implemented at stack level internally.

	There is no default value for local variables, so local variables should be declared and an initial value should be assigned before the first use.	


	public class Test {
	   public void pupAge() {
	      int age = 0;
	      age = age + 7;
	      System.out.println("Puppy age is : " + age);
	   }

	   public static void main(String args[]) {
	      Test test = new Test();
	      test.pupAge();
	   }
	}


// Instance variables

	Instance variables are declared in a class, but outside a method, constructor or any block.

	When a space is allocated for an object in the heap, a slot for each instance variable value is created.

	Instance variables are created when an object is created with the use of the keyword 'new' and destroyed when the object is destroyed.

	Instance variables hold values that must be referenced by more than one method, constructor or block, or essential parts of an objects state that must be present throughout the class.

	Instance variables can be declared in class level before or after use.

	Access modifiers can be given for instance variables.

	The instance variables are visible for all methods, constructors and block in the class. Normally, it is recommended to make these variables private (access level). However, visibility for subclasses can be given for these variables with the use of access modifiers.

	Instance variables have default values. For numbers, the default value is 0, for Booleans it is false, and for object references it is null. Values can be assigned during the declaration or within the constructor.

	Instance variables can be accessed directly by calling the variable name inside the class. However, within static methods (when instance variables are given accessibility), they should be called using the fully qualified name. ObjectReference.VariableName.

	import java.io.*;
	public class Employee {

	   // this instance variable is visible for any child class.
	   public String name;

	   // salary  variable is visible in Employee class only.
	   private double salary;

	   // The name variable is assigned in the constructor.
	   public Employee (String empName) {
	      name = empName;
	   }

	   // The salary variable is assigned a value.
	   public void setSalary(double empSal) {
	      salary = empSal;
	   }

	   // This method prints the employee details.
	   public void printEmp() {
	      System.out.println("name  : " + name );
	      System.out.println("salary :" + salary);
	   }

	   public static void main(String args[]) {
	      Employee empOne = new Employee("Ransika");
	      empOne.setSalary(1000);
	      empOne.printEmp();
	   }
	}


// Class/Static Variables
	Class variables also known as static variables are declared with the static keyword in a class, but outside a method, constructor or a block.

	There would only be one copy of each class variable per class, regardless of how many objects are created from it.

	Static variables are rarely used other than being declared as constants. Constants are variables that are declared as public/private, final, and static. Constant variables never change from their initial value.

	Static variables are stored in the static memory. It is rare to use static variables other than declared final and used as either public or private constants.

	Static variables are created when the program starts and destroyed when the program stops.

	Visibility is similar to instance variables. However, most static variables are declared public since they must be available for users of the class.

	Default values are same as instance variables. For numbers, the default value is 0; for Booleans, it is false; and for object references, it is null. Values can be assigned during the declaration or within the constructor. Additionally, values can be assigned in special static initializer blocks.

	Static variables can be accessed by calling with the class name ClassName.VariableName.

	When declaring class variables as public static final, then variable names (constants) are all in upper case. If the static variables are not public and final, the naming syntax is the same as instance and local variables.

	import java.io.*;
	public class Employee {

	   // salary  variable is a private static variable
	   private static double salary;

	   // DEPARTMENT is a constant
	   public static final String DEPARTMENT = "Development ";

	   public static void main(String args[]) {
	      salary = 1000;
	      System.out.println(DEPARTMENT + "average salary:" + salary);
	   }
	}


/* -------------------------------------------------------- */
	Modifier Types
/* -------------------------------------------------------- */

Modifiers are keywords that you add to those definitions to change their meanings.

	Java Access Modifiers
	Non Access Modifiers


	public class className {
	   // ...
	}

	private boolean myFlag;
	static final double weeks = 9.5;
	protected static final int BOXWIDTH = 42;

	public static void main(String[] arguments) {
	   // body of method
	}


// Access control modifiers

	Visible to the package, the default. No modifiers are needed.

	Visible to the class only (private).

	Visible to the world (public).

	Visible to the package and all subclasses (protected).


// Non-access modifiers

	The static modifier for creating class methods and variables.

	The final modifier for finalizing the implementations of classes, methods, and variables.

	The abstract modifier for creating abstract classes and methods.

	The synchronized and volatile modifiers, which are used for threads.


/* -------------------------------------------------------- */
	Basic Operators
/* -------------------------------------------------------- */

Arithmetic Operators
Relational Operators
Bitwise Operators
Logical Operators
Assignment Operators
Misc Operators


/* -------------------------------------------------------- */
	Arithmetic Operators
/* -------------------------------------------------------- */

+ (Addition)	

	Adds values on either side of the operator.	

	A + B will give 30


- (Subtraction)	

	Subtracts right-hand operand from left-hand operand.	

	A - B will give -10


* (Multiplication)	

	Multiplies values on either side of the operator.	

	A * B will give 200


/ (Division)	

	Divides left-hand operand by right-hand operand.	

	B / A will give 2


% (Modulus)	

	Divides left-hand operand by right-hand operand and returns remainder.	

	B % A will give 0


++ (Increment)	

	Increases the value of operand by 1.	

	B++ gives 21


-- (Decrement)	

	Decreases the value of operand by 1.	

	B-- gives 19


/* -------------------------------------------------------- */
	Relational Operators
/* -------------------------------------------------------- */

== (equal to)	

	Checks if the values of two operands are equal or not, if yes then condition becomes true.	

	(A == B) is not true.


!= (not equal to)	

	Checks if the values of two operands are equal or not, if values are not equal then condition becomes true.	

	(A != B) is true.


> (greater than)	

	Checks if the value of left operand is greater than the value of right operand, if yes then condition becomes true.	

	(A > B) is not true.


< (less than)	

	Checks if the value of left operand is less than the value of right operand, if yes then condition becomes true.	

	(A < B) is true.


>= (greater than or equal to)	

	Checks if the value of left operand is greater than or equal to the value of right operand, if yes then condition becomes true.	

	(A >= B) is not true.


<= (less than or equal to)	

	Checks if the value of left operand is less than or equal to the value of right operand, if yes then condition becomes true.	

	(A <= B) is true.


/* -------------------------------------------------------- */
	Bitwise Operators
/* -------------------------------------------------------- */

Java defines several bitwise operators, which can be applied to the integer types, long, int, short, char, and byte.

Bitwise operator works on bits and performs bit-by-bit operation. Assume if a = 60 and b = 13; now in binary format they will be as follows −

	a = 0011 1100

	b = 0000 1101

	-----------------

	a&b = 0000 1100

	a|b = 0011 1101

	a^b = 0011 0001

	~a  = 1100 0011


& (bitwise and)	

	Binary AND Operator copies a bit to the result if it exists in both operands.	

	(A & B) will give 12 which is 0000 1100


| (bitwise or)	

	Binary OR Operator copies a bit if it exists in either operand.	

	(A | B) will give 61 which is 0011 1101


^ (bitwise XOR)	

	Binary XOR Operator copies the bit if it is set in one operand but not both.	
	(A ^ B) will give 49 which is 0011 0001


~ (bitwise compliment)	

	Binary Ones Complement Operator is unary and has the effect of 'flipping' bits.	
	(~A ) will give -61 which is 1100 0011 in 2's complement form due to a signed binary number.


<< (left shift)	

	Binary Left Shift Operator. The left operands value is moved left by the number of bits specified by the right operand.	

	A << 2 will give 240 which is 1111 0000


>> (right shift)	

	Binary Right Shift Operator. The left operands value is moved right by the number of bits specified by the right operand.	

	A >> 2 will give 15 which is 1111


>>> (zero fill right shift)	

	Shift right zero fill operator. The left operands value is moved right by the number of bits specified by the right operand and shifted values are filled up with zeros.	

	A >>>2 will give 15 which is 0000 1111


/* -------------------------------------------------------- */
	Assignment operators
/* -------------------------------------------------------- */

=	Simple assignment operator. 

	Assigns values from right side operands to left side operand.	

	C = A + B will assign value of A + B into C


+=	Add AND assignment operator. 

	It adds right operand to the left operand and assign the result to left operand.	

	C += A is equivalent to C = C + A


-=	Subtract AND assignment operator. 

	It subtracts right operand from the left operand and assign the result to left operand.	

	C -= A is equivalent to C = C – A


*=	Multiply AND assignment operator. 

	It multiplies right operand with the left operand and assign the result to left operand.	

	C *= A is equivalent to C = C * A


/=	Divide AND assignment operator. 

	It divides left operand with the right operand and assign the result to left operand.	

	C /= A is equivalent to C = C / A


%=	Modulus AND assignment operator. 

	It takes modulus using two operands and assign the result to left operand.	

	C %= A is equivalent to C = C % A


<<=	Left shift AND assignment operator.	

	C <<= 2 is same as C = C << 2


>>=	Right shift AND assignment operator.	

	C &= 2 is same as C = C & 2


&=	Bitwise AND assignment operator.	

	C >>= 2 is same as C = C >> 2


^=	bitwise exclusive OR and assignment operator.	

	C ^= 2 is same as C = C ^ 2


|=	bitwise inclusive OR and assignment operator.	

	C |= 2 is same as C = C | 2



/* -------------------------------------------------------- */
	Miscellaneous operators
/* -------------------------------------------------------- */

// Conditional Operator ( ? : )
	
	Conditional operator is also known as the ternary operator. This operator consists of three operands and is used to evaluate Boolean expressions. The goal of the operator is to decide, which value should be assigned to the variable.

	variable x = (expression) ? value if true : value if false

	public class Test {

		public static void main(String args[]) {
			int a, b;
			a = 10;
			b = (a == 1) ? 20: 30;
			System.out.println( "Value of b is : " +  b );

			b = (a == 10) ? 20: 30;
			System.out.println( "Value of b is : " + b );
		}
	}


// instanceof operator

	This operator is used only for object reference variables. The operator checks whether the object is of a particular type (class type or interface type).

	( Object reference variable ) instanceof  (class/interface type)

	public class Test {

	   public static void main(String args[]) {

	      String name = "James";

	      // following will return true since name is type of String
	      boolean result = name instanceof String;
	      System.out.println( result );
	   }
	}	


/* -------------------------------------------------------- */
	Precedence of Java Operators
/* -------------------------------------------------------- */

Operator precedence determines the grouping of terms in an expression. This affects how an expression is evaluated. Certain operators have higher precedence than others.

For example, x = 7 + 3 * 2; here x is assigned 13, not 20 because operator * has higher precedence than +, so it first gets multiplied with 3 * 2 and then adds into 7.

Postfix	>() [] . (dot operator)	Left toright
Unary	>++ - - ! ~	Right to left
Multiplicative	>* /	Left to right
Additive	>+ -	Left to right
Shift	>>> >>> <<	Left to right
Relational	>> >= < <=	Left to right
Equality	>== !=	Left to right
Bitwise AND	>&	Left to right
Bitwise XOR	>^	Left to right
Bitwise OR	>|	Left to right
Logical AND	>&&	Left to right
Logical OR	>||	Left to right
Conditional	?:	Right to left
Assignment	>= += -= *= /= %= >>= <<= &= ^= |=	Right to left


/* -------------------------------------------------------- */
	Loop control
/* -------------------------------------------------------- */

while loop

	Repeats a statement or group of statements while a given condition is true. It tests the condition before executing the loop body.


for loop

	Execute a sequence of statements multiple times and abbreviates the code that manages the loop variable.


do...while loop

	Like a while statement, except that it tests the condition at the end of the loop body.


// loop control statements

	break;

		Terminates the loop or switch statement and transfers execution to the statement immediately following the loop or switch.


	continue;

		Causes the loop to skip the remainder of its body and immediately retest its condition prior to reiterating.


// Enhanced loop

	This is mainly used to traverse collection of elements including arrays.

	// Example
	int [] numbers = {10, 20, 30, 40, 50};

	for(int x : numbers ) {
		System.out.println( x );
	}	


/* -------------------------------------------------------- */
	Decision making
/* -------------------------------------------------------- */

if statement

	An if statement consists of a boolean expression followed by one or more statements.


if...else statement

	An if statement can be followed by an optional else statement, which executes when the boolean expression is false.


nested if statement

	You can use one if or else if statement inside another if or else if statement(s).


switch statement

	A switch statement allows a variable to be tested for equality against a list of values.




/* -------------------------------------------------------- */
	Numbers Class
/* -------------------------------------------------------- */

All the wrapper classes (Integer, Long, Byte, Double, Float, Short) are subclasses of the abstract class Number.

The object of the wrapper class contains or wraps its respective primitive data type. Converting primitive data types into object is called boxing, and this is taken care by the compiler. Therefore, while using a wrapper class you just need to pass the value of the primitive data type to the constructor of the Wrapper class.

	// Example
	public class Test {

	   public static void main(String args[]) {
	      Integer x = 5; // boxes int to an Integer object
	      x =  x + 10;   // unboxes the Integer to a int
	      System.out.println(x); 
	   }
	}

	// When x is assigned an integer value, the compiler boxes the integer because x is integer object. Later, x is unboxed so that they can be added as an integer.


// Number methods

xxxValue()

	Converts the value of this Number object to the xxx data type and returns it.


compareTo()

	Compares this Number object to the argument.


equals()

	Determines whether this number object is equal to the argument.


valueOf()

	Returns an Integer object holding the value of the specified primitive.


toString()

	Returns a String object representing the value of a specified int or Integer.


parseInt()

	This method is used to get the primitive data type of a certain String.


abs()

	Returns the absolute value of the argument.


ceil()

	Returns the smallest integer that is greater than or equal to the argument. Returned as a double.


floor()

	Returns the largest integer that is less than or equal to the argument. Returned as a double.


rint()

	Returns the integer that is closest in value to the argument. Returned as a double.


round()

	Returns the closest long or int, as indicated by the methods return type to the argument.


min()

	Returns the smaller of the two arguments.


max()

	Returns the larger of the two arguments.


exp()

	Returns the base of the natural logarithms, e, to the power of the argument.


log()

	Returns the natural logarithm of the argument.


pow()

	Returns the value of the first argument raised to the power of the second argument.


sqrt()

	Returns the square root of the argument.


sin()
	
	Returns the sine of the specified double value.


cos()
	
	Returns the cosine of the specified double value.


tan()

	Returns the tangent of the specified double value.


asin()

	Returns the arcsine of the specified double value.


acos()

	Returns the arccosine of the specified double value.


atan()

	Returns the arctangent of the specified double value.


atan2()

	Converts rectangular coordinates (x, y) to polar coordinate (r, theta) and returns theta.


toDegrees()

	Converts the argument to degrees.


toRadians()

	Converts the argument to radians.


random()

	Returns a random number.



/* -------------------------------------------------------- */
	Character class
/* -------------------------------------------------------- */

Character ch = new Character('a');

The Java compiler will also create a Character object for you under some circumstances. For example, if you pass a primitive char into a method that expects an object, the compiler automatically converts the char to a Character for you. This feature is called autoboxing or unboxing, if the conversion goes the other way.

	// Here following primitive char 'a'
	// is boxed into the Character object ch
	Character ch = 'a';

	// Here primitive 'x' is boxed for method test,
	// return is unboxed to char 'c'
	char c = test('x');



/* -------------------------------------------------------- */
	Escape Sequences
/* -------------------------------------------------------- */

/*
\t	Inserts a tab in the text at this point.
\b	Inserts a backspace in the text at this point.
\n	Inserts a newline in the text at this point.
\r	Inserts a carriage return in the text at this point.
\f	Inserts a form feed in the text at this point.
\'	Inserts a single quote character in the text at this point.
\"	Inserts a double quote character in the text at this point.
\\	Inserts a backslash character in the text at this point.
*/

// Example
public class Test {

   public static void main(String args[]) {
      System.out.println("She said \"Hello!\" to me.");
   }
}


// Character methods

isLetter()

	Determines whether the specified char value is a letter.


isDigit()
	
	Determines whether the specified char value is a digit.


isWhitespace()

	Determines whether the specified char value is white space.


isUpperCase()

	Determines whether the specified char value is uppercase.


isLowerCase()

	Determines whether the specified char value is lowercase.


toUpperCase()

	Returns the uppercase form of the specified char value.


toLowerCase()

	Returns the lowercase form of the specified char value.


toString()

	Returns a String object representing the specified character value that is, a one-character string.


/* -------------------------------------------------------- */
	Strings Class
/* -------------------------------------------------------- */

Strings, which are widely used in Java programming, are a sequence of characters. In Java programming language, strings are treated as objects.

The Java platform provides the String class to create and manipulate strings.


// Create strings

	String greeting = "Hello world!";

		// Whenever it encounters a string literal in your code, the compiler creates a String object with its value in this case, "Hello world!'.

	// Alternatively
	public class StringDemo {

	   public static void main(String args[]) {
	      char[] helloArray = { 'h', 'e', 'l', 'l', 'o', '.' };
	      String helloString = new String(helloArray);  
	      System.out.println( helloString );
	   }
	}

		// As with any other object, you can create String objects by using the new keyword and a constructor. The String class has 11 constructors that allow you to provide the initial value of the string using different sources, such as an array of characters.


// String length

	Methods used to obtain information about an object are known as accessor methods. One accessor method that you can use with strings is the length() method, which returns the number of characters contained in the string object.

	public class StringDemo {

	   public static void main(String args[]) {
	      String palindrome = "Dot saw I was Tod";
	      int len = palindrome.length();
	      System.out.println( "String Length is : " + len );
	   }
	}	


// Concatenating strings

	string1.concat(string2);

	"Hello," + " world" + "!"


// Creating string formats

	System.out.printf("The value of the float variable is " +
                  "%f, while the value of the integer " +
                  "variable is %d, and the string " +
                  "is %s", floatVar, intVar, stringVar);



	String fs;
	fs = String.format("The value of the float variable is " +
	                   "%f, while the value of the integer " +
	                   "variable is %d, and the string " +
	                   "is %s", floatVar, intVar, stringVar);
	System.out.println(fs);



// String methods

char charAt(int index)

	Returns the character at the specified index.


int compareTo(Object o)

	Compares this String to another Object.


int compareTo(String anotherString)

	Compares two strings lexicographically.


int compareToIgnoreCase(String str)

	Compares two strings lexicographically, ignoring case differences.


String concat(String str)

	Concatenates the specified string to the end of this string.


boolean contentEquals(StringBuffer sb)

	Returns true if and only if this String represents the same sequence of characters as the specified StringBuffer.


static String copyValueOf(char[] data)

	Returns a String that represents the character sequence in the array specified.


static String copyValueOf(char[] data, int offset, int count)

	Returns a String that represents the character sequence in the array specified.


boolean endsWith(String suffix)
	
	Tests if this string ends with the specified suffix.


boolean equals(Object anObject)

	Compares this string to the specified object.


boolean equalsIgnoreCase(String anotherString)

	Compares this String to another String, ignoring case considerations.


byte getBytes()

	Encodes this String into a sequence of bytes using the platforms default charset, storing the result into a new byte array.


byte[] getBytes(String charsetName)

	Encodes this String into a sequence of bytes using the named charset, storing the result into a new byte array.


void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)

	Copies characters from this string into the destination character array.


int hashCode()

	Returns a hash code for this string.


int indexOf(int ch)

	Returns the index within this string of the first occurrence of the specified character.


int indexOf(int ch, int fromIndex)

	Returns the index within this string of the first occurrence of the specified character, starting the search at the specified index.


int indexOf(String str)

	Returns the index within this string of the first occurrence of the specified substring.


int indexOf(String str, int fromIndex)

	Returns the index within this string of the first occurrence of the specified substring, starting at the specified index.


String intern()

	Returns a canonical representation for the string object.


int lastIndexOf(int ch)

	Returns the index within this string of the last occurrence of the specified character.


int lastIndexOf(int ch, int fromIndex)

	Returns the index within this string of the last occurrence of the specified character, searching backward starting at the specified index.


int lastIndexOf(String str)

	Returns the index within this string of the rightmost occurrence of the specified substring.


int lastIndexOf(String str, int fromIndex)

	Returns the index within this string of the last occurrence of the specified substring, searching backward starting at the specified index.


int length()

	Returns the length of this string.


boolean matches(String regex)

	Tells whether or not this string matches the given regular expression.


boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)

	Tests if two string regions are equal.


boolean regionMatches(int toffset, String other, int ooffset, int len)

	Tests if two string regions are equal.


String replace(char oldChar, char newChar)

	Returns a new string resulting from replacing all occurrences of oldChar in this string with newChar.


String replaceAll(String regex, String replacement

	Replaces each substring of this string that matches the given regular expression with the given replacement.


String replaceFirst(String regex, String replacement)

	Replaces the first substring of this string that matches the given regular expression with the given replacement.


String[] split(String regex)

	Splits this string around matches of the given regular expression.


String[] split(String regex, int limit)

	Splits this string around matches of the given regular expression.


boolean startsWith(String prefix)

	Tests if this string starts with the specified prefix.


boolean startsWith(String prefix, int toffset)

	Tests if this string starts with the specified prefix beginning a specified index.


CharSequence subSequence(int beginIndex, int endIndex)

	Returns a new character sequence that is a subsequence of this sequence.


String substring(int beginIndex)

	Returns a new string that is a substring of this string.


String substring(int beginIndex, int endIndex)

	Returns a new string that is a substring of this string.

char[] toCharArray()

	Converts this string to a new character array.


String toLowerCase()

	Converts all of the characters in this String to lower case using the rules of the default locale.


String toLowerCase(Locale locale)

	Converts all of the characters in this String to lower case using the rules of the given Locale.


String toString()

	This object (which is already a string!) is itself returned.


String toUpperCase()

	Converts all of the characters in this String to upper case using the rules of the default locale.


String toUpperCase(Locale locale)

	Converts all of the characters in this String to upper case using the rules of the given Locale.


String trim()

	Returns a copy of the string, with leading and trailing whitespace omitted.


static String valueOf(primitive data type x)

	Returns the string representation of the passed data type argument.



/* -------------------------------------------------------- */
	Arrays
/* -------------------------------------------------------- */

Java provides a data structure, the array, which stores a fixed-size sequential collection of elements of the same type. An array is used to store a collection of data, but it is often more useful to think of an array as a collection of variables of the same type.

// Syntax
dataType[] arrayRefVar;   // preferred way.

dataType arrayRefVar[];  // works but not preferred way.


// Example
double[] myList;   // preferred way.

double myList[];   // works but not preferred way.


// Creating arrays
arrayRefVar = new dataType[arraySize];

dataType[] arrayRefVar = {value0, value1, ..., valuek};

	// The array elements are accessed through the index. Array indices are 0-based; that is, they start from 0 to arrayRefVar.length-1.


// for loop
public class TestArray {

   public static void main(String[] args) {
      double[] myList = {1.9, 2.9, 3.4, 3.5};

      // Print all the array elements
      for (int i = 0; i < myList.length; i++) {
         System.out.println(myList[i] + " ");
      }
     
      // Summing all elements
      double total = 0;
      for (int i = 0; i < myList.length; i++) {
         total += myList[i];
      }
      System.out.println("Total is " + total);
      
      // Finding the largest element
      double max = myList[0];
      for (int i = 1; i < myList.length; i++) {
         if (myList[i] > max) max = myList[i];
      }
      System.out.println("Max is " + max);  
   }
}


// foreach
public class TestArray {

   public static void main(String[] args) {
      double[] myList = {1.9, 2.9, 3.4, 3.5};

      // Print all the array elements
      for (double element: myList) {
         System.out.println(element);
      }
   }
}


// Returning arrays
public static int[] reverse(int[] list) {
   int[] result = new int[list.length];

   for (int i = 0, j = result.length - 1; i < list.length; i++, j--) {
      result[j] = list[i];
   }
   return result;
}


// Arrays class
java.util.Arrays

	public static int binarySearch(Object[] a, Object key)

		Searches the specified array of Object ( Byte, Int , double, etc.) for the specified value using the binary search algorithm. The array must be sorted prior to making this call. This returns index of the search key, if it is contained in the list; otherwise, it returns ( – (insertion point + 1)).


	public static boolean equals(long[] a, long[] a2)

		Returns true if the two specified arrays of longs are equal to one another. Two arrays are considered equal if both arrays contain the same number of elements, and all corresponding pairs of elements in the two arrays are equal. This returns true if the two arrays are equal. Same method could be used by all other primitive data types (Byte, short, Int, etc.)


	public static void fill(int[] a, int val)

		Assigns the specified int value to each element of the specified array of ints. The same method could be used by all other primitive data types (Byte, short, Int, etc.)


	public static void sort(Object[] a)

		Sorts the specified array of objects into an ascending order, according to the natural ordering of its elements. The same method could be used by all other primitive data types ( Byte, short, Int, etc.)


/* -------------------------------------------------------- */
	Date and Time
/* -------------------------------------------------------- */

 java.util.Date


// Date Class Constructor
	
	Date( )

		This constructor initializes the object with the current date and time.


	Date(long millisec)

		This constructor accepts an argument that equals the number of milliseconds that have elapsed since midnight, January 1, 1970.


// Method & description

	boolean after(Date date)

		Returns true if the invoking Date object contains a date that is later than the one specified by date, otherwise, it returns false.


	boolean before(Date date)

		Returns true if the invoking Date object contains a date that is earlier than the one specified by date, otherwise, it returns false.


	Object clone( )

		Duplicates the invoking Date object.


	int compareTo(Date date)

		Compares the value of the invoking object with that of date. Returns 0 if the values are equal. Returns a negative value if the invoking object is earlier than date. Returns a positive value if the invoking object is later than date.


	int compareTo(Object obj)

		// Operates identically to compareTo(Date) if obj is of class Date. Otherwise, it throws a ClassCastException.


	boolean equals(Object date)

		Returns true if the invoking Date object contains the same time and date as the one specified by date, otherwise, it returns false.


	long getTime( )

		Returns the number of milliseconds that have elapsed since January 1, 1970.


	int hashCode( )

		Returns a hash code for the invoking object.


	void setTime(long time)

		Sets the time and date as specified by time, which represents an elapsed time in milliseconds from midnight, January 1, 1970.


	String toString( )

		Converts the invoking Date object into a string and returns the result.


// Get current date and time
import java.util.Date;
public class DateDemo {

   public static void main(String args[]) {
      // Instantiate a Date object
      Date date = new Date();

      // display time and date using toString()
      System.out.println(date.toString());
   }
}


// Date comparison

	You can use getTime( ) to obtain the number of milliseconds that have elapsed since midnight, January 1, 1970, for both objects and then compare these two values.

	You can use the methods before( ), after( ), and equals( ). Because the 12th of the month comes before the 18th, for example, new Date(99, 2, 12).before(new Date (99, 2, 18)) returns true.

	You can use the compareTo( ) method, which is defined by the Comparable interface and implemented by Date.


// SimpleDateFormat

	SimpleDateFormat is a concrete class for formatting and parsing dates in a locale-sensitive manner.

	// Example
	import java.util.*;
	import java.text.*;

	public class DateDemo {

	   public static void main(String args[]) {
	      Date dNow = new Date( );
	      SimpleDateFormat ft = 
	      new SimpleDateFormat ("E yyyy.MM.dd 'at' hh:mm:ss a zzz");

	      System.out.println("Current Date: " + ft.format(dNow));
	   }
	}

	// Current Date: Sun 2004.07.18 at 04:14:09 PM PDT


// SimpleDateFormat format codes

	To specify the time format, use a time pattern string. In this pattern, all ASCII letters are reserved as pattern letters, which are defined as the following
/*
	G	Era designator	AD
	y	Year in four digits	2001
	M	Month in year	July or 07
	d	Day in month	10
	h	Hour in A.M./P.M. (1~12)	12
	H	Hour in day (0~23)	22
	m	Minute in hour	30
	s	Second in minute	55
	S	Millisecond	234
	E	Day in week	Tuesday
	D	Day in year	360
	F	Day of week in month	2 (second Wed. in July)
	w	Week in year	40
	W	Week in month	1
	a	A.M./P.M. marker	PM
	k	Hour in day (1~24)	24
	K	Hour in A.M./P.M. (0~11)	10
	z	Time zone	Eastern Standard Time
	'	Escape for text	Delimiter
	"	Single quote	`
*/


// Date formatting using printf

	import java.util.Date;
	public class DateDemo {

	   public static void main(String args[]) {
	      // Instantiate a Date object
	      Date date = new Date();

	      // display time and date using toString()
	      String str = String.format("Current Date/Time : %tc", date );

	      System.out.printf(str);
	   }
	}
	// Current Date/Time : Sat Dec 15 16:37:57 MST 2012



	import java.util.Date;
	public class DateDemo {

	   public static void main(String args[]) {
	      // Instantiate a Date object
	      Date date = new Date();
	  
	      // display time and date using toString()
	      System.out.printf("%1$s %2$tB %2$td, %2$tY", "Due date:", date);
	   }
	}
	// Due date: February 09, 2004


	import java.util.Date;
	public class DateDemo {

	   public static void main(String args[]) {
	      // Instantiate a Date object
	      Date date = new Date();
	  
	      // display formatted date
	      System.out.printf("%s %tB %<te, %<tY", "Due date:", date);
	   }
	}
	// Due date: February 09, 2004



// Date and time conversion characters

	c	Complete date and time	Mon May 04 09:51:52 CDT 2009
	F	ISO 8601 date	2004-02-09
	D	U.S. formatted date (month/day/year)	02/09/2004
	T	24-hour time	18:05:19
	r	12-hour time	06:05:19 pm
	R	24-hour time, no seconds	18:05
	Y	Four-digit year (with leading zeroes)	2004
	y	Last two digits of the year (with leading zeroes)	04
	C	First two digits of the year (with leading zeroes)	20
	B	Full month name	February
	b	Abbreviated month name	Feb
	m	Two-digit month (with leading zeroes)	02
	d	Two-digit day (with leading zeroes)	03
	e	Two-digit day (without leading zeroes)	9
	A	Full weekday name	Monday
	a	Abbreviated weekday name	Mon
	j	Three-digit day of year (with leading zeroes)	069
	H	Two-digit hour (with leading zeroes), between 00 and 23	18
	k	Two-digit hour (without leading zeroes), between 0 and 23	18
	I	Two-digit hour (with leading zeroes), between 01 and 12	06
	l	Two-digit hour (without leading zeroes), between 1 and 12	6
	M	Two-digit minutes (with leading zeroes)	05
	S	Two-digit seconds (with leading zeroes)	19
	L	Three-digit milliseconds (with leading zeroes)	047
	N	Nine-digit nanoseconds (with leading zeroes)	047000000
	P	Uppercase morning or afternoon marker	PM
	p	Lowercase morning or afternoon marker	pm
	z	RFC 822 numeric offset from GMT	-0800
	Z	Time zone	PST
	s	Seconds since 1970-01-01 00:00:00 GMT	1078884319
	Q	Milliseconds since 1970-01-01 00:00:00 GMT	1078884319047


// Parsing strings into dates

	The SimpleDateFormat class has some additional methods, notably parse( ), which tries to parse a string according to the format stored in the given SimpleDateFormat object.


	import java.util.*;
	import java.text.*;
	  
	public class DateDemo {

	   public static void main(String args[]) {
	      SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd"); 
	      String input = args.length == 0 ? "1818-11-11" : args[0]; 

	      System.out.print(input + " Parses as "); 
	      Date t;
	      try {
	         t = ft.parse(input); 
	         System.out.println(t); 
	      }catch (ParseException e) { 
	         System.out.println("Unparseable using " + ft); 
	      }
	   }
	}
	// 1818-11-11 Parses as Wed Nov 11 00:00:00 EST 1818


// Sleeping

	You can sleep for any period of time from one millisecond up to the lifetime of your computer.

	import java.util.*;
	public class SleepDemo {

	   public static void main(String args[]) {
	      try { 
	         System.out.println(new Date( ) + "\n"); 
	         Thread.sleep(5*60*10); 
	         System.out.println(new Date( ) + "\n"); 
	      }catch (Exception e) {
	         System.out.println("Got an exception!"); 
	      }
	   }
	}

	// Sun May 03 18:04:41 GMT 2009
	// Sun May 03 18:04:51 GMT 2009



// Measuring elapsed time

	Sometimes, you may need to measure point in time in milliseconds.

	import java.util.*;
	public class DiffDemo {

	   public static void main(String args[]) {
	      try {
	         long start = System.currentTimeMillis( );
	         System.out.println(new Date( ) + "\n");
	         
	         Thread.sleep(5*60*10);
	         System.out.println(new Date( ) + "\n");
	         
	         long end = System.currentTimeMillis( );
	         long diff = end - start;
	         System.out.println("Difference is : " + diff);
	      }catch (Exception e) {
	         System.out.println("Got an exception!");
	      }
	   }
	}

	// Sun May 03 18:16:51 GMT 2009
	// Sun May 03 18:16:57 GMT 2009
	// Difference is : 5993


// GregorianCalendar Class

	The getInstance( ) method of Calendar returns a GregorianCalendar initialized with the current date and time in the default locale and time zone. GregorianCalendar defines two fields: AD and BC. These represent the two eras defined by the Gregorian calendar.


// Constructors

	GregorianCalendar()

		Constructs a default GregorianCalendar using the current time in the default time zone with the default locale.


	GregorianCalendar(int year, int month, int date)

		Constructs a GregorianCalendar with the given date set in the default time zone with the default locale.


	GregorianCalendar(int year, int month, int date, int hour, int minute)

		Constructs a GregorianCalendar with the given date and time set for the default time zone with the default locale.


	GregorianCalendar(int year, int month, int date, int hour, int minute, int second)

		Constructs a GregorianCalendar with the given date and time set for the default time zone with the default locale.


	GregorianCalendar(Locale aLocale)

		Constructs a GregorianCalendar based on the current time in the default time zone with the given locale.


	GregorianCalendar(TimeZone zone)

		Constructs a GregorianCalendar based on the current time in the given time zone with the default locale.


	GregorianCalendar(TimeZone zone, Locale aLocale)

		Constructs a GregorianCalendar based on the current time in the given time zone with the given locale.	



// Methods

	void add(int field, int amount)

		Adds the specified (signed) amount of time to the given time field, based on the calendar rules.


	protected void computeFields()

		Converts UTC as milliseconds to time field values.


	protected void computeTime()

		Overrides Calendar Converts time field values to UTC as milliseconds.


	boolean equals(Object obj)

		Compares this GregorianCalendar to an object reference.


	int get(int field)

		Gets the value for a given time field.


	int getActualMaximum(int field)

		Returns the maximum value that this field could have, given the current date.


	int getActualMinimum(int field)

		Returns the minimum value that this field could have, given the current date.


	int getGreatestMinimum(int field)

		Returns highest minimum value for the given field if varies.


	Date getGregorianChange()

		Gets the Gregorian Calendar change date.


	int getLeastMaximum(int field)

		Returns lowest maximum value for the given field if varies.


	int getMaximum(int field)

		Returns maximum value for the given field.


	Date getTime()

		Gets this Calendars current time.


	long getTimeInMillis()

		Gets this Calendars current time as a long.


	TimeZone getTimeZone()

		Gets the time zone.


	int getMinimum(int field)

		Returns minimum value for the given field.


	int hashCode()

		Overrides hashCode.


	boolean isLeapYear(int year)

		Determines if the given year is a leap year.


	void roll(int field, boolean up)

		Adds or subtracts (up/down) a single unit of time on the given time field without changing larger fields.


	void set(int field, int value)

		Sets the time field with the given value.


	void set(int year, int month, int date)

		Sets the values for the fields year, month, and date.


	void set(int year, int month, int date, int hour, int minute)

		Sets the values for the fields year, month, date, hour, and minute.


	void set(int year, int month, int date, int hour, int minute, int second)

		Sets the values for the fields year, month, date, hour, minute, and second.


	void setGregorianChange(Date date)

		Sets the GregorianCalendar change date.


	void setTime(Date date)

		Sets this Calendars current time with the given Date.


	void setTimeInMillis(long millis)

		Sets this Calendars current time from the given long value.


	void setTimeZone(TimeZone value)

		Sets the time zone with the given time zone value.


	String toString()

		Returns a string representation of this calendar.


// Example
import java.util.*;
public class GregorianCalendarDemo {

   public static void main(String args[]) {
      String months[] = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
         "Oct", "Nov", "Dec"};
      
      int year;
      // Create a Gregorian calendar initialized
      // with the current date and time in the
      // default locale and timezone.
      
      GregorianCalendar gcalendar = new GregorianCalendar();
      
      // Display current time and date information.
      System.out.print("Date: ");
      System.out.print(months[gcalendar.get(Calendar.MONTH)]);
      System.out.print(" " + gcalendar.get(Calendar.DATE) + " ");
      System.out.println(year = gcalendar.get(Calendar.YEAR));
      System.out.print("Time: ");
      System.out.print(gcalendar.get(Calendar.HOUR) + ":");
      System.out.print(gcalendar.get(Calendar.MINUTE) + ":");
      System.out.println(gcalendar.get(Calendar.SECOND));

      // Test if the current year is a leap year
      if(gcalendar.isLeapYear(year)) {
         System.out.println("The current year is a leap year");
      }else {
         System.out.println("The current year is not a leap year");
      }
   }
}
// Date: Apr 22 2009
// Time: 11:25:27
// The current year is not a leap year


/* -------------------------------------------------------- */
	Regular Expressions
/* -------------------------------------------------------- */

java.util.regex

A regular expression is a special sequence of characters that helps you match or find other strings or sets of strings, using a specialized syntax held in a pattern. They can be used to search, edit, or manipulate text and data.

Pattern Class − A Pattern object is a compiled representation of a regular expression. The Pattern class provides no public constructors. To create a pattern, you must first invoke one of its public static compile() methods, which will then return a Pattern object. These methods accept a regular expression as the first argument.

Matcher Class − A Matcher object is the engine that interprets the pattern and performs match operations against an input string. Like the Pattern class, Matcher defines no public constructors. You obtain a Matcher object by invoking the matcher() method on a Pattern object.

PatternSyntaxException − A PatternSyntaxException object is an unchecked exception that indicates a syntax error in a regular expression pattern.


// Capturing groups

Capturing groups are a way to treat multiple characters as a single unit. They are created by placing the characters to be grouped inside a set of parentheses. For example, the regular expression (dog) creates a single group containing the letters "d", "o", and "g".

	Capturing groups are numbered by counting their opening parentheses from the left to the right. In the expression ((A)(B(C))), for example, there are four such groups −

	((A)(B(C)))
	(A)
	(B(C))
	(C)


import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {

   public static void main( String args[] ) {
      // String to be scanned to find the pattern.
      String line = "This order was placed for QT3000! OK?";
      String pattern = "(.*)(\\d+)(.*)";

      // Create a Pattern object
      Pattern r = Pattern.compile(pattern);

      // Now create matcher object.
      Matcher m = r.matcher(line);
      if (m.find( )) {
         System.out.println("Found value: " + m.group(0) );
         System.out.println("Found value: " + m.group(1) );
         System.out.println("Found value: " + m.group(2) );
      }else {
         System.out.println("NO MATCH");
      }
   }
}
// Found value: This order was placed for QT3000! OK?
// Found value: This order was placed for QT300
// Found value: 0


// Regular expression syntax

	^	Matches the beginning of the line.
	$	Matches the end of the line.
	.	Matches any single character except newline. Using m option allows it to match the newline as well.
	[...]	Matches any single character in brackets.
	[^...]	Matches any single character not in brackets.
	\A	Beginning of the entire string.
	\z	End of the entire string.
	\Z	End of the entire string except allowable final line terminator.
	re*	Matches 0 or more occurrences of the preceding expression.
	re+	Matches 1 or more of the previous thing.
	re?	Matches 0 or 1 occurrence of the preceding expression.
	re{ n}	Matches exactly n number of occurrences of the preceding expression.
	re{ n,}	Matches n or more occurrences of the preceding expression.
	re{ n, m}	Matches at least n and at most m occurrences of the preceding expression.
	a| b	Matches either a or b.
	(re)	Groups regular expressions and remembers the matched text.
	(?: re)	Groups regular expressions without remembering the matched text.
	(?> re)	Matches the independent pattern without backtracking.
	\w	Matches the word characters.
	\W	Matches the nonword characters.
	\s	Matches the whitespace. Equivalent to [\t\n\r\f].
	\S	Matches the nonwhitespace.
	\d	Matches the digits. Equivalent to [0-9].
	\D	Matches the nondigits.
	\A	Matches the beginning of the string.
	\Z	Matches the end of the string. If a newline exists, it matches just before newline.
	\z	Matches the end of the string.
	\G	Matches the point where the last match finished.
	\n	Back-reference to capture group number "n".
	\b	Matches the word boundaries when outside the brackets. Matches the backspace (0x08) when inside the brackets.
	\B	Matches the nonword boundaries.
	\n, \t, etc.	Matches newlines, carriage returns, tabs, etc.
	\Q	Escape (quote) all characters up to \E.
	\E	Ends quoting begun with \Q.


// Methods of the matcher class

// Index methods

	Index methods provide useful index values that show precisely where the match was found in the input string

	public int start()

		Returns the start index of the previous match.


	public int start(int group)

		Returns the start index of the subsequence captured by the given group during the previous match operation.


	public int end()

		Returns the offset after the last character matched.


	public int end(int group)

		Returns the offset after the last character of the subsequence captured by the given group during the previous match operation.


// Study methods

	Study methods review the input string and return a Boolean indicating whether or not the pattern is found


	public boolean lookingAt()

		Attempts to match the input sequence, starting at the beginning of the region, against the pattern.


	public boolean find()

		Attempts to find the next subsequence of the input sequence that matches the pattern.


	public boolean find(int start)

		Resets this matcher and then attempts to find the next subsequence of the input sequence that matches the pattern, starting at the specified index.


	public boolean matches()

		Attempts to match the entire region against the pattern.	


// Replacement methods

	Replacement methods are useful methods for replacing text in an input string


	public Matcher appendReplacement(StringBuffer sb, String replacement)

		Implements a non-terminal append-and-replace step.


	public StringBuffer appendTail(StringBuffer sb)

		Implements a terminal append-and-replace step.


	public String replaceAll(String replacement)

		Replaces every subsequence of the input sequence that matches the pattern with the given replacement string.


	public String replaceFirst(String replacement)

		Replaces the first subsequence of the input sequence that matches the pattern with the given replacement string.


	public static String quoteReplacement(String s)

		Returns a literal replacement String for the specified String. This method produces a String that will work as a literal replacement s in the appendReplacement method of the Matcher class.


import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {

   private static final String REGEX = "\\bcat\\b";
   private static final String INPUT = "cat cat cat cattie cat";

   public static void main( String args[] ) {
      Pattern p = Pattern.compile(REGEX);
      Matcher m = p.matcher(INPUT);   // get a matcher object
      int count = 0;

      while(m.find()) {
         count++;
         System.out.println("Match number "+count);
         System.out.println("start(): "+m.start());
         System.out.println("end(): "+m.end());
      }
   }
}
/*
Match number 1
start(): 0
end(): 3
Match number 2
start(): 4
end(): 7
Match number 3
start(): 8
end(): 11
Match number 4
start(): 19
end(): 22
*/


// Matches and lookingAt methods
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {

   private static final String REGEX = "foo";
   private static final String INPUT = "fooooooooooooooooo";
   private static Pattern pattern;
   private static Matcher matcher;

   public static void main( String args[] ) {
      pattern = Pattern.compile(REGEX);
      matcher = pattern.matcher(INPUT);

      System.out.println("Current REGEX is: "+REGEX);
      System.out.println("Current INPUT is: "+INPUT);

      System.out.println("lookingAt(): "+matcher.lookingAt());
      System.out.println("matches(): "+matcher.matches());
   }
}
/*
Current REGEX is: foo
Current INPUT is: fooooooooooooooooo
lookingAt(): true
matches(): false
*/


// replaceFirst and replaceAll Methods
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {

   private static String REGEX = "dog";
   private static String INPUT = "The dog says meow. " + "All dogs say meow.";
   private static String REPLACE = "cat";

   public static void main(String[] args) {
      Pattern p = Pattern.compile(REGEX);
      
      // get a matcher object
      Matcher m = p.matcher(INPUT); 
      INPUT = m.replaceAll(REPLACE);
      System.out.println(INPUT);
   }
}
// The cat says meow. All cats say meow.


// appendReplacement and appendTail Methods
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {

   private static String REGEX = "a*b";
   private static String INPUT = "aabfooaabfooabfoob";
   private static String REPLACE = "-";
   public static void main(String[] args) {

      Pattern p = Pattern.compile(REGEX);
      
      // get a matcher object
      Matcher m = p.matcher(INPUT);
      StringBuffer sb = new StringBuffer();
      while(m.find()) {
         m.appendReplacement(sb, REPLACE);
      }
      m.appendTail(sb);
      System.out.println(sb.toString());
   }
}
// -foo-foo-foo-


// PatternSyntaxException Class Methods

	A PatternSyntaxException is an unchecked exception that indicates a syntax error in a regular expression pattern.


	public String getDescription()

		Retrieves the description of the error.


	public int getIndex()

		Retrieves the error index.


	public String getPattern()

		Retrieves the erroneous regular expression pattern.


	public String getMessage()

		Returns a multi-line string containing the description of the syntax error and its index, the erroneous regular expression pattern, and a visual indication of the error index within the pattern.



/* -------------------------------------------------------- */
	Methods
/* -------------------------------------------------------- */

A Java method is a collection of statements that are grouped together to perform an operation. When you call the System.out.println() method, for example, the system actually executes several statements in order to display a message on the console.

// Syntax
public static int methodName(int a, int b) {
   // body
}

	public static − modifier

	int − return type

	methodName − name of the method

	a, b − formal parameters

	int a, int b − list of parameters


// Method calling

	For using a method, it should be called. There are two ways in which a method is called i.e., method returns a value or returning nothing (no return value).


// void keyword

	The void keyword allows us to create methods which do not return a value.


// Passing parameters by value

	Passing Parameters by Value means calling a method with a parameter. Through this, the argument value is passed to the parameter.


// Method overloading

	When a class has two or more methods by the same name but different parameters, it is known as method overloading. It is different from overriding. In overriding, a method has the same method name, type, number of parameters, etc.

public class ExampleOverloading {

   public static void main(String[] args) {
      int a = 11;
      int b = 6;
      double c = 7.3;
      double d = 9.4;
      int result1 = minFunction(a, b);
      
      // same function name with different parameters
      double result2 = minFunction(c, d);
      System.out.println("Minimum Value = " + result1);
      System.out.println("Minimum Value = " + result2);
   }

   // for integer
   public static int minFunction(int n1, int n2) {
      int min;
      if (n1 > n2)
         min = n2;
      else
         min = n1;

      return min; 
   }
   
   // for double
   public static double minFunction(double n1, double n2) {
     double min;
      if (n1 > n2)
         min = n2;
      else
         min = n1;

      return min; 
   }
}


// Using command-line arguments

	Sometimes you will want to pass some information into a program when you run it. This is accomplished by passing command-line arguments to main( ).

	A command-line argument is the information that directly follows the program name on the command line when it is executed. To access the command-line arguments inside a Java program is quite easy. They are stored as strings in the String array passed to main( ).

	// Example
	$java CommandLine this is a command line 200 -100
	/*
	args[0]: this
	args[1]: is
	args[2]: a
	args[3]: command
	args[4]: line
	args[5]: 200
	args[6]: -100
	*/


// Constructors

	A constructor initializes an object when it is created. It has the same name as its class and is syntactically similar to a method. However, constructors have no explicit return type.

	Typically, you will use a constructor to give initial values to the instance variables defined by the class, or to perform any other startup procedures required to create a fully formed object.

	All classes have constructors, whether you define one or not, because Java automatically provides a default constructor that initializes all member variables to zero. However, once you define your own constructor, the default constructor is no longer used.

	// Example
	
	// A simple constructor.
	class MyClass {
	   int x;

	   // Following is the constructor
	   MyClass() {
	      x = 10;
	   }
	}

	public class ConsDemo {

	   public static void main(String args[]) {
	      MyClass t1 = new MyClass();
	      MyClass t2 = new MyClass();
	      System.out.println(t1.x + " " + t2.x);
	   }
	}


// Parameterized constructor

	Most often, you will need a constructor that accepts one or more parameters. Parameters are added to a constructor in the same way that they are added to a method, just declare them inside the parentheses after the constructors name.

	// A simple constructor.
	class MyClass {
	   int x;
	   
	   // Following is the constructor
	   MyClass(int i ) {
	      x = i;
	   }
	}

	// Calling
	public class ConsDemo {

	   public static void main(String args[]) {
	      MyClass t1 = new MyClass( 10 );
	      MyClass t2 = new MyClass( 20 );
	      System.out.println(t1.x + " " + t2.x);
	   }
	}


// this keyword

	this is a keyword in Java which is used as a reference to the object of the current class, with in an instance method or a constructor. Using this you can refer the members of a class such as constructors, variables and methods.

	Note − The keyword this is used only within instance methods or constructors

	In general, the keyword this is used to differentiate the instance variables from local variables if they have same names, within a constructor or a method.

	class Student {
	   int age;   
	   Student(int age) {
	      this.age = age;	
	   }
	}	

// Example
public class This_Example {
   // Instance variable num
   int num = 10;
	
   This_Example() {
      System.out.println("This is an example program on keyword this");	
   }

   This_Example(int num) {
      // Invoking the default constructor
      this();
      
      // Assigning the local variable num to the instance variable num
      this.num = num;	   
   }
   
   public void greet() {
      System.out.println("Hi Welcome to Tutorialspoint");
   }
      
   public void print() {
      // Local variable num
      int num = 20;
      
      // Printing the local variable
      System.out.println("value of local variable num is : "+num);
      
      // Printing the instance variable
      System.out.println("value of instance variable num is : "+this.num);
      
      // Invoking the greet method of a class
      this.greet();     
   }
   
   public static void main(String[] args) {
      // Instantiating the class
      This_Example obj1 = new This_Example();
      
      // Invoking the print method
      obj1.print();
	  
      // Passing a new value to the num variable through parametrized constructor
      This_Example obj2 = new This_Example(30);
      
      // Invoking the print method again
      obj2.print(); 
   }
}
/*
This is an example program on keyword this 
value of local variable num is : 20
value of instance variable num is : 10
Hi Welcome to Tutorialspoint
This is an example program on keyword this 
value of local variable num is : 20
value of instance variable num is : 30
Hi Welcome to Tutorialspoint
*/


// Variable arguments (var-args)

	JDK 1.5 enables you to pass a variable number of arguments of the same type to a method. The parameter in the method is declared as follows −

	typeName... parameterName

	public class VarargsDemo {

	   public static void main(String args[]) {
	      // Call method with variable args  
		   printMax(34, 3, 3, 2, 56.5);
	      printMax(new double[]{1, 2, 3});
	   }

	   public static void printMax( double... numbers) {
	      if (numbers.length == 0) {
	         System.out.println("No argument passed");
	         return;
	      }

	      double result = numbers[0];

	      for (int i = 1; i <  numbers.length; i++)
	      if (numbers[i] >  result)
	      result = numbers[i];
	      System.out.println("The max value is " + result);
	   }
	}
	/*
	The max value is 56.5
	The max value is 3.0
	*/


// finalize() method

	It is possible to define a method that will be called just before an objects final destruction by the garbage collector. This method is called finalize( ), and it can be used to ensure that an object terminates cleanly.

	For example, you might use finalize( ) to make sure that an open file owned by that object is closed.

	To add a finalizer to a class, you simply define the finalize( ) method. The Java runtime calls that method whenever it is about to recycle an object of that class.

	Inside the finalize( ) method, you will specify those actions that must be performed before an object is destroyed.

	protected void finalize( ) {
	   // finalization code here
	}

	This means that you cannot know when or even if finalize( ) will be executed. For example, if your program ends before garbage collection occurs, finalize( ) will not execute.



/* -------------------------------------------------------- */
	Files and I/O
/* -------------------------------------------------------- */

The java.io package contains nearly every class you might ever need to perform input and output (I/O) in Java. All these streams represent an input source and an output destination. The stream in the java.io package supports many data such as primitives, object, localized characters, etc.


// Stream

	Stream is a sequence of data.

	InPutStream − The InputStream is used to read data from a source.

	OutPutStream − The OutputStream is used for writing data to a destination.


// Byte streams

	Java byte streams are used to perform input and output of 8-bit bytes. Though there are many classes related to byte streams but the most frequently used classes are, FileInputStream and FileOutputStream.

	import java.io.*;
	public class CopyFile {

	   public static void main(String args[]) throws IOException {  
	      FileInputStream in = null;
	      FileOutputStream out = null;

	      try {
	         in = new FileInputStream("input.txt");
	         out = new FileOutputStream("output.txt");
	         
	         int c;
	         while ((c = in.read()) != -1) {
	            out.write(c);
	         }
	      }finally {
	         if (in != null) {
	            in.close();
	         }
	         if (out != null) {
	            out.close();
	         }
	      }
	   }
	}


// Character code

	Java Byte streams are used to perform input and output of 8-bit bytes, whereas Java Character streams are used to perform input and output for 16-bit unicode. Though there are many classes related to character streams but the most frequently used classes are, FileReader and FileWriter. Though internally FileReader uses FileInputStream and FileWriter uses FileOutputStream but here the major difference is that FileReader reads two bytes at a time and FileWriter writes two bytes at a time.

	import java.io.*;
	public class CopyFile {

	   public static void main(String args[]) throws IOException {
	      FileReader in = null;
	      FileWriter out = null;

	      try {
	         in = new FileReader("input.txt");
	         out = new FileWriter("output.txt");
	         
	         int c;
	         while ((c = in.read()) != -1) {
	            out.write(c);
	         }
	      }finally {
	         if (in != null) {
	            in.close();
	         }
	         if (out != null) {
	            out.close();
	         }
	      }
	   }
	}


// Standard streams

	All the programming languages provide support for standard I/O where the users program can take input from a keyboard and then produce an output on the computer screen. If you are aware of C or C++ programming languages, then you must be aware of three standard devices STDIN, STDOUT and STDERR. 

	Standard Input − This is used to feed the data to users program and usually a keyboard is used as standard input stream and represented as System.in.

	Standard Output − This is used to output the data produced by the users program and usually a computer screen is used for standard output stream and represented as System.out.

	Standard Error − This is used to output the error data produced by the users program and usually a computer screen is used for standard error stream and represented as System.err.


// InputStreamReader to read standard input stream until the user types a "q"
import java.io.*;
public class ReadConsole {

   public static void main(String args[]) throws IOException {
      InputStreamReader cin = null;

      try {
         cin = new InputStreamReader(System.in);
         System.out.println("Enter characters, 'q' to quit.");
         char c;
         do {
            c = (char) cin.read();
            System.out.print(c);
         } while(c != 'q');
      }finally {
         if (cin != null) {
            cin.close();
         }
      }
   }
}
/*
$javac ReadConsole.java
$java ReadConsole
Enter characters, 'q' to quit.
1
1
e
e
q
q
*/


/* -------------------------------------------------------- */
	Reading and Writing Files
/* -------------------------------------------------------- */

A stream can be defined as a sequence of data. The InputStream is used to read data from a source and the OutputStream is used for writing data to a destination.

The two important streams are FileInputStream and FileOutputStream.


// FileInputStream

	This stream is used for reading data from the files. Objects can be created using the keyword new and there are several types of constructors available.

	InputStream f = new FileInputStream("C:/java/hello");

	// OR

	File f = new File("C:/java/hello");
	InputStream f = new FileInputStream(f);


// methods for InputStream

	public void close() throws IOException{}

		This method closes the file output stream. Releases any system resources associated with the file. Throws an IOException.


	protected void finalize()throws IOException {}

		This method cleans up the connection to the file. Ensures that the close method of this file output stream is called when there are no more references to this stream. Throws an IOException.


	public int read(int r)throws IOException{}

		This method reads the specified byte of data from the InputStream. Returns an int. Returns the next byte of data and -1 will be returned if its the end of the file.


	public int read(byte[] r) throws IOException{}

		This method reads r.length bytes from the input stream into an array. Returns the total number of bytes read. If it is the end of the file, -1 will be returned.


	public int available() throws IOException{}

		Gives the number of bytes that can be read from this file input stream. Returns an int.


// Other important streams

	ByteArrayInputStream

	DataInputStream



// FileOutputStream

	FileOutputStream is used to create a file and write data into it. The stream would create a file, if it doesnt already exist, before opening it for output.

	// ctor
	OutputStream f = new FileOutputStream("C:/java/hello") 

	// OR
	File f = new File("C:/java/hello");
	OutputStream f = new FileOutputStream(f);


// OutputStream methods

	public void close() throws IOException{}

		This method closes the file output stream. Releases any system resources associated with the file. Throws an IOException.


	protected void finalize()throws IOException {}

		This method cleans up the connection to the file. Ensures that the close method of this file output stream is called when there are no more references to this stream. Throws an IOException.


	public void write(int w)throws IOException{}

		This methods writes the specified byte to the output stream.


	public void write(byte[] w)

		Writes w.length bytes from the mentioned byte array to the OutputStream.


// Other important streams

	ByteArrayOutputStream

	DataOutputStream


// Example of InputStream and OutputStream

import java.io.*;
public class fileStreamTest {

   public static void main(String args[]) {
   
      try {
         byte bWrite [] = {11,21,3,40,5};
         OutputStream os = new FileOutputStream("test.txt");
         for(int x = 0; x < bWrite.length ; x++) {
            os.write( bWrite[x] );   // writes the bytes
         }
         os.close();
     
         InputStream is = new FileInputStream("test.txt");
         int size = is.available();

         for(int i = 0; i < size; i++) {
            System.out.print((char)is.read() + "  ");
         }
         is.close();
      }catch(IOException e) {
         System.out.print("Exception");
      }	
   }
}


// File navigation and IO

	File Class

	FileReader Class

	FileWriter Class


// Directories

	A directory is a File which can contain a list of other files and directories. You use File object to create directories, to list down files available in a directory.

// Creating Directories

	mkdir() 

		method creates a directory, returning true on success and false on failure. Failure indicates that the path specified in the File object already exists, or that the directory cannot be created because the entire path does not exist yet.

	mkdirs() 

		method creates both a directory and all the parents of the directory.	

// Example

import java.io.File;
public class CreateDir {

   public static void main(String args[]) {
      String dirname = "/tmp/user/java/bin";
      File d = new File(dirname);
      
      // Create directory now.
      d.mkdirs();
   }
}
// creates "/tmp/user/java/bin" directory

	// Note − Java automatically takes care of path separators on UNIX and Windows as per conventions. If you use a forward slash (/) on a Windows version of Java, the path will still resolve correctly.



// List directories

	You can use list( ) method provided by File object to list down all the files and directories available in a directory as follows −

// Example
import java.io.File;
public class ReadDir {

   public static void main(String[] args) {
      File file = null;
      String[] paths;
  
      try {      
         // create new file object
         file = new File("/tmp");

         // array of files and directory
         paths = file.list();

         // for each name in the path array
         for(String path:paths) {
            // prints filename and directory name
            System.out.println(path);
         }
      }catch(Exception e) {
         // if any error occurs
         e.printStackTrace();
      }
   }
}
/*
test1.txt
test2.txt
ReadDir.java
ReadDir.class
*/



/* -------------------------------------------------------- */
	Exceptions
/* -------------------------------------------------------- */

java.lang.Exception

An exception (or exceptional event) is a problem that arises during the execution of a program. When an Exception occurs the normal flow of the program is disrupted and the program/Application terminates abnormally, which is not recommended, therefore, these exceptions are to be handled.


Checked exceptions

	A checked exception is an exception that occurs at the compile time, these are also called as compile time exceptions. These exceptions cannot simply be ignored at the time of compilation, the programmer should take care of (handle) these exceptions.


Unchecked exceptions

	An unchecked exception is an exception that occurs at the time of execution. These are also called as Runtime Exceptions. These include programming bugs, such as logic errors or improper use of an API. Runtime exceptions are ignored at the time of compilation.


Errors

	These are not exceptions at all, but problems that arise beyond the control of the user or the programmer. Errors are typically ignored in your code because you can rarely do anything about an error. For example, if a stack overflow occurs, an error will arise. They are also ignored at the time of compilation.


// Exception hierarchy

	// The exception class is a subclass of the Throwable class. Other than the exception class there is another subclass called Error which is derived from the Throwable class.

	// Errors are abnormal conditions that happen in case of severe failures, these are not handled by the Java programs. Errors are generated to indicate errors generated by the runtime environment. Example: JVM is out of memory. Normally, programs cannot recover from errors.

	// The Exception class has two main subclasses: IOException class and RuntimeException Class.



// Exception methods

	public String getMessage()

		Returns a detailed message about the exception that has occurred. This message is initialized in the Throwable constructor.


	public Throwable getCause()

		Returns the cause of the exception as represented by a Throwable object.


	public String toString()

		// Returns the name of the class concatenated with the result of getMessage().


	public void printStackTrace()

		Prints the result of toString() along with the stack trace to System.err, the error output stream.


	public StackTraceElement [] getStackTrace()

		Returns an array containing each element on the stack trace. The element at index 0 represents the top of the call stack, and the last element in the array represents the method at the bottom of the call stack.


	public Throwable fillInStackTrace()

		Fills the stack trace of this Throwable object with the current stack trace, adding to any previous information in the stack trace.	



// Catching exceptions

	A method catches an exception using a combination of the try and catch keywords. A try/catch block is placed around the code that might generate an exception. Code within a try/catch block is referred to as protected code, and the syntax for using try/catch looks like the following −


try {
   // Protected code
}catch(ExceptionName e1) {
   // Catch block
}finally{
   // Required code	
}


// Excample
// File Name : ExcepTest.java
import java.io.*;

public class ExcepTest {

   public static void main(String args[]) {
      try {
         int a[] = new int[2];
         System.out.println("Access element three :" + a[3]);
      }catch(ArrayIndexOutOfBoundsException e) {
         System.out.println("Exception thrown  :" + e);
      }
      System.out.println("Out of the block");
   }
}


// Mutiple catch blocks
try {
   // Protected code
}catch(ExceptionType1 e1) {
   // Catch block
}catch(ExceptionType2 e2) {
   // Catch block
}catch(ExceptionType3 e3) {
   // Catch block
}

// Example
try {
   file = new FileInputStream(fileName);
   x = (byte) file.read();
}catch(IOException i) {
   i.printStackTrace();
   return -1;
}catch(FileNotFoundException f) // Not valid! {
   f.printStackTrace();
   return -1;
}



// Catching multiple type of exceptions
catch (IOException|FileNotFoundException ex) {
   logger.log(ex);
   throw ex;
}



// Throws/Throw keywords

	If a method does not handle a checked exception, the method must declare it using the throws keyword. The throws keyword appears at the end of a methods signature.

	Throws is used to postpone the handling of a checked exception and throw is used to invoke an exception explicitly.


	// Example
	import java.io.*;
	public class className {

	   public void deposit(double amount) throws RemoteException {
	      // Method implementation
	      throw new RemoteException();
	   }
	   // Remainder of class definition
	}


	// Throw multiple
	import java.io.*;
	public class className {

	   public void withdraw(double amount) throws RemoteException, InsufficientFundsException {
	      // Method implementation
	   }
	   // Remainder of class definition
	}



// Finally block

	The finally block follows a try block or a catch block. A finally block of code always executes, irrespective of occurrence of an Exception.

	Using a finally block allows you to run any cleanup-type statements that you want to execute, no matter what happens in the protected code.

try {
   // Protected code
}catch(ExceptionType1 e1) {
   // Catch block
}catch(ExceptionType2 e2) {
   // Catch block
}catch(ExceptionType3 e3) {
   // Catch block
}finally {
   // The finally block always executes.
}


// Note

	A catch clause cannot exist without a try statement.

	It is not compulsory to have finally clauses whenever a try/catch block is present.

	The try block cannot be present without either catch clause or finally clause.

	Any code cannot be present in between the try, catch, finally blocks.



// Try-with-resources

	Generally, when we use any resources like streams, connections, etc. we have to close them explicitly using finally block. In the following program, we are reading data from a file using FileReader and we are closing it using finally block.

// Original
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class ReadData_Demo {

   public static void main(String args[]) {
      FileReader fr = null;		
      try {
         File file = new File("file.txt");
         fr = new FileReader(file); char [] a = new char[50];
         fr.read(a);   // reads the content to the array
         for(char c : a)
         System.out.print(c);   // prints the characters one by one
      }catch(IOException e) {
         e.printStackTrace();
      }finally {
         try {
            fr.close();
         }catch(IOException ex) {		
            ex.printStackTrace();
         }
      }
   }
}



// try-with-resources

	// also referred as automatic resource management, is a new exception handling mechanism that was introduced in Java 7, which automatically closes the resources used within the try catch block.

// Syntax
try(FileReader fr = new FileReader("file path")) {
   // use the resource
   }catch() {
      // body of catch 
   }
}

// Better
import java.io.FileReader;
import java.io.IOException;

public class Try_withDemo {

   public static void main(String args[]) {
      try(FileReader fr = new FileReader("E://file.txt")) {
         char [] a = new char[50];
         fr.read(a);   // reads the contentto the array
         for(char c : a)
         System.out.print(c);   // prints the characters one by one
      }catch(IOException e) {
         e.printStackTrace();
      }
   }
}


// Keep in mind when working with try-with-resources

/*
	To use a class with try-with-resources statement it should implement AutoCloseable interface and the close() method of it gets invoked automatically at runtime.

	You can declare more than one class in try-with-resources statement.

	While you declare multiple classes in the try block of try-with-resources statement these classes are closed in reverse order.

	Except the declaration of resources within the parenthesis everything is the same as normal try/catch block of a try block.

	The resource declared in try gets instantiated just before the start of the try-block.

	The resource declared at the try block is implicitly declared as final.
*/



// User-defined exceptions

	All exceptions must be a child of Throwable.

	If you want to write a checked exception that is automatically enforced by the Handle or Declare Rule, you need to extend the Exception class.

	If you want to write a runtime exception, you need to extend the RuntimeException class.

	// Syntax

		class MyException extends Exception {
		}


	You just need to extend the predefined Exception class to create your own Exception. These are considered to be checked exceptions. The following InsufficientFundsException class is a user-defined exception that extends the Exception class, making it a checked exception. An exception class is like any other class, containing useful fields and methods.


// Example

	// File Name InsufficientFundsException.java
	import java.io.*;

	public class InsufficientFundsException extends Exception {
	   private double amount;
	   
	   public InsufficientFundsException(double amount) {
	      this.amount = amount;
	   }
	   
	   public double getAmount() {
	      return amount;
	   }
	}

	// File Name CheckingAccount.java
	import java.io.*;

	public class CheckingAccount {
	   private double balance;
	   private int number;
	   
	   public CheckingAccount(int number) {
	      this.number = number;
	   }
	   
	   public void deposit(double amount) {
	      balance += amount;
	   }
	   
	   public void withdraw(double amount) throws InsufficientFundsException {
	      if(amount <= balance) {
	         balance -= amount;
	      }else {
	         double needs = amount - balance;
	         throw new InsufficientFundsException(needs);
	      }
	   }
	   
	   public double getBalance() {
	      return balance;
	   }
	   
	   public int getNumber() {
	      return number;
	   }
	}

	// File Name BankDemo.java
	public class BankDemo {

	   public static void main(String [] args) {
	      CheckingAccount c = new CheckingAccount(101);
	      System.out.println("Depositing $500...");
	      c.deposit(500.00);
	      
	      try {
	         System.out.println("\nWithdrawing $100...");
	         c.withdraw(100.00);
	         System.out.println("\nWithdrawing $600...");
	         c.withdraw(600.00);
	      }catch(InsufficientFundsException e) {
	         System.out.println("Sorry, but you are short $" + e.getAmount());
	         e.printStackTrace();
	      }
	   }
	}
	/* Output:
	Depositing $500...

	Withdrawing $100...

	Withdrawing $600...
	Sorry, but you are short $200.0
	InsufficientFundsException
	         at CheckingAccount.withdraw(CheckingAccount.java:25)
	         at BankDemo.main(BankDemo.java:13)
	*/



// Common exceptions

	VM Exceptions − These are exceptions/errors that are exclusively or logically thrown by the JVM. Examples: NullPointerException, ArrayIndexOutOfBoundsException, ClassCastException.

	Programmatic Exceptions − These exceptions are thrown explicitly by the application or the API programmers. Examples: IllegalArgumentException, IllegalStateException.    



/* -------------------------------------------------------- */
	Inner classes
/* -------------------------------------------------------- */

// Nested classes

	In Java, just like methods, variables of a class too can have another class as its member. Writing a class within another is allowed in Java. The class written within is called the nested class, and the class that holds the inner class is called the outer class.

// Syntax

class Outer_Demo {
   class Nested_Demo {
   }
}


Non-static nested classes

	These are the non-static members of a class.


Static nested classes

	These are the static members of a class.



// Example of private class

	class Outer_Demo {
	   int num;
	   
	   // inner class
	   private class Inner_Demo {
	      public void print() {
	         System.out.println("This is an inner class");
	      }
	   }
	   
	   // Accessing he inner class from the method within
	   void display_Inner() {
	      Inner_Demo inner = new Inner_Demo();
	      inner.print();
	   }
	}
	   
	public class My_class {

	   public static void main(String args[]) {
	      // Instantiating the outer class 
	      Outer_Demo outer = new Outer_Demo();
	      
	      // Accessing the display_Inner() method.
	      outer.display_Inner();
	   }
	}
	// This is an inner class.



// Method-local inner class

	In Java, we can write a class within a method and this will be a local type. Like local variables, the scope of the inner class is restricted within the method.

	// Example
	public class Outerclass {
	   // instance method of the outer class 
	   void my_Method() {
	      int num = 23;

	      // method-local inner class
	      class MethodInner_Demo {
	         public void print() {
	            System.out.println("This is method inner class "+num);	   
	         }   
	      } // end of inner class
		   
	      // Accessing the inner class
	      MethodInner_Demo inner = new MethodInner_Demo();
	      inner.print();
	   }
	   
	   public static void main(String args[]) {
	      Outerclass outer = new Outerclass();
	      outer.my_Method();	   	   
	   }
	}
	// This is method inner class 23



// Anonymous inner class

	An inner class declared without a class name is known as an anonymous inner class. In case of anonymous inner classes, we declare and instantiate them at the same time. Generally, they are used whenever you need to override the method of a class or an interface.

	// Example
	abstract class AnonymousInner {
	   public abstract void mymethod();
	}

	public class Outer_class {

	   public static void main(String args[]) {
	      AnonymousInner inner = new AnonymousInner() {
	         public void mymethod() {
	            System.out.println("This is an example of anonymous inner class");
	         }
	      };
	      inner.mymethod();	
	   }
	}



// Anonymous Inner Class as Argument

	Generally, if a method accepts an object of an interface, an abstract class, or a concrete class, then we can implement the interface, extend the abstract class, and pass the object to the method. If it is a class, then we can directly pass it to the method.

	But in all the three cases, you can pass an anonymous inner class to the method. Here is the syntax of passing an anonymous inner class as a method argument −

	obj.my_Method(new My_Class() {
	   public void Do() {
	      .....
	      .....
	   }
	});

	// Example

		// interface
		interface Message {
		   String greet();	
		}

		public class My_class {
		   // method which accepts the object of interface Message
		   public void displayMessage(Message m) {
		      System.out.println(m.greet() +
		         ", This is an example of anonymous inner class as an argument");	   
		   }

		   public static void main(String args[]) {
		      // Instantiating the class
		      My_class obj = new My_class();
				
		      // Passing an anonymous inner class as an argument
		      obj.displayMessage(new Message() {
		         public String greet() {
		            return "Hello";  		   
		         }
		      });
		   }
		}
		//Hello This is an example of anonymous inner class as an argument



// Static nested class

	A static inner class is a nested class which is a static member of the outer class. It can be accessed without instantiating the outer class, using other static members.

	class MyOuter {
	   static class Nested_Demo {
	   }
	}

	// Example

		public class Outer {
		   static class Nested_Demo {
		      public void my_method() {
		         System.out.println("This is my nested class");
		      }
		   }
		   
		   public static void main(String args[]) {
		      Outer.Nested_Demo nested = new Outer.Nested_Demo();	 
		      nested.my_method();
		   }
		}
		// This is my nested class



/* -------------------------------------------------------- */
	Inheritance
/* -------------------------------------------------------- */

	Inheritance can be defined as the process where one class acquires the properties (methods and fields) of another. With the use of inheritance the information is made manageable in a hierarchical order.

	The class which inherits the properties of other is known as subclass (derived class, child class) and the class whose properties are inherited is known as superclass (base class, parent class).


// extends keyword

	extends is the keyword used to inherit the properties of a class.

	class Super {
	}
	class Sub extends Super {
	}


// Example

	class Calculation {
	   int z;
		
	   public void addition(int x, int y) {
	      z = x + y;
	      System.out.println("The sum of the given numbers:"+z);
	   }
		
	   public void Subtraction(int x, int y) {
	      z = x - y;
	      System.out.println("The difference between the given numbers:"+z);
	   }
	}

	public class My_Calculation extends Calculation {
	   public void multiplication(int x, int y) {
	      z = x * y;
	      System.out.println("The product of the given numbers:"+z);
	   }
		
	   public static void main(String args[]) {
	      int a = 20, b = 10;
	      My_Calculation demo = new My_Calculation();
	      demo.addition(a, b);
	      demo.Subtraction(a, b);
	      demo.multiplication(a, b);
	   }
	}
	/*
	The sum of the given numbers:30
	The difference between the given numbers:10
	The product of the given numbers:200
	*/

		// In the given program, when an object to My_Calculation class is created, a copy of the contents of the superclass is made within it. That is why, using the object of the subclass you can access the members of a superclass.


// Note

	A subclass inherits all the members (fields, methods, and nested classes) from its superclass. Constructors are not members, so they are not inherited by subclasses, but the constructor of the superclass can be invoked from the subclass.



// super keyword

	It is used to differentiate the members of superclass from the members of subclass, if they have same names.

	It is used to invoke the superclass constructor from subclass.


// Example

	class Super_class {
	   int num = 20;

	   // display method of superclass
	   public void display() {
	      System.out.println("This is the display method of superclass");
	   }
	}

	public class Sub_class extends Super_class {
	   int num = 10;

	   // display method of sub class
	   public void display() {
	      System.out.println("This is the display method of subclass");
	   }

	   public void my_method() {
	      // Instantiating subclass
	      Sub_class sub = new Sub_class();

	      // Invoking the display() method of sub class
	      sub.display();

	      // Invoking the display() method of superclass
	      super.display();

	      // printing the value of variable num of subclass
	      System.out.println("value of the variable named num in sub class:"+ sub.num);

	      // printing the value of variable num of superclass
	      System.out.println("value of the variable named num in super class:"+ super.num);
	   }

	   public static void main(String args[]) {
	      Sub_class obj = new Sub_class();
	      obj.my_method();
	   }
	}


// Invoking superclass ctor

	// If a class is inheriting the properties of another class, the subclass automatically acquires the default constructor of the superclass. But if you want to call a parameterized constructor of the superclass, you need to use the super keyword as shown below.

	super(values);

// Example

	class Superclass {
	   int age;

	   Superclass(int age) {
	      this.age = age; 		 
	   }

	   public void getAge() {
	      System.out.println("The value of the variable named age in super class is: " +age);
	   }
	}

	public class Subclass extends Superclass {
	   Subclass(int age) {
	      super(age);
	   }

	   public static void main(String argd[]) {
	      Subclass s = new Subclass(24);
	      s.getAge();
	   }
	}
	// The value of the variable named age in super class is: 24


// IS-A Relationship

	IS-A is a way of saying: This object is a type of that object. 

public class Animal {
}

public class Mammal extends Animal {
}

public class Reptile extends Animal {
}

public class Dog extends Mammal {
}


Animal is the superclass of Mammal class.
Animal is the superclass of Reptile class.
Mammal and Reptile are subclasses of Animal class.
Dog is the subclass of both Mammal and Animal classes.


Mammal IS-A Animal
Reptile IS-A Animal
Dog IS-A Mammal
Hence: Dog IS-A Animal as well


//Example

	class Animal {
	}

	class Mammal extends Animal {
	}

	class Reptile extends Animal {
	}

	public class Dog extends Mammal {

	   public static void main(String args[]) {
	      Animal a = new Animal();
	      Mammal m = new Mammal();
	      Dog d = new Dog();

	      System.out.println(m instanceof Animal);
	      System.out.println(d instanceof Mammal);
	      System.out.println(d instanceof Animal);
	   }
	} 



// implements keyword

	Generally, the implements keyword is used with classes to inherit the properties of an interface. Interfaces can never be extended by a class.

	public interface Animal {
	}

	public class Mammal implements Animal {
	}

	public class Dog extends Mammal {
	}



	

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */



/* -------------------------------------------------------- */
	Hello World
/* -------------------------------------------------------- */

public class HelloWorld {

   public static void main(String []args) {
      System.out.println("Hello World"); // prints Hello World
   }
}

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */

/* -------------------------------------------------------- */


=============================================================

package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class main {
	public static void main(String[] args) throws FileNotFoundException {
        String line;
        String words[] = null;
        String filename = "Dict.txt";
        File file = new File(filename);
        
        if(file.exists()) {
        	System.out.println("File " + filename + " exists.");
        }
        
        Scanner scan = new Scanner(file);
        while(scan.hasNext())
        {
            line = scan.nextLine();
            words = line.split(" "); 
        }
        //number of words
        System.out.println("Number of words: " + words.length);
        
        //Timer
        long startTime1 = System.nanoTime();
        System.out.println("TECHNIQUE 1 running...");
//TECHNIQUE 1
    	int max1 = 0;
    	int maxword1 = 0; //might need something other than 0
    	int count1 = 0;
        //find word with max anagram
        for(int i = 0; i < words.length - 1; i++) {
        	if(count1 > max1) {
        		max1 = count1;
        		maxword1 = i - 1;
        	}
        	count1 = 0;
        	for (int j = i+1; j < words.length; j++) {
        		if(words[i].length() == words[j].length()) {//if w1 and w2 same length
        			if(technique1(words[i],words[j])) {
        				count1++;
        			}
        		}       		
        	}
        }
        float estimatedTime1 = (float)(System.nanoTime() - startTime1)/1000000000;
        System.out.println("Technique #1: " + words[maxword1] + " has " + max1 + " anagrams " + estimatedTime1 + " secs");

        long startTime2 = System.nanoTime();
        System.out.println("TECHNIQUE 2 running...");
//TECHNIQUE 2        
    	int max2 = 0;
    	int maxword2 = 0; //might need something other than 0
    	int count2 = 0;
        //find word with max anagram
        for(int i = 0; i < words.length - 1; i++) {
        	if(count2 > max2) {
        		max2 = count2;
        		maxword2 = i - 1;
        	}
        	count2 = 0;
        	for (int j = i+1; j < words.length; j++) {
        		if(words[i].length() == words[j].length()) {//if w1 and w2 same length
        			if(technique2(words[i],words[j])) {
        				count2++;
        			}
        		}       		
        	}
        }
        float estimatedTime2 = (float)(System.nanoTime() - startTime2)/1000000000;
        System.out.println("Technique #2: " + words[maxword2] + " has " + max2 + " anagrams " + estimatedTime2 + " secs");
        
        long startTime3 = System.nanoTime();
        System.out.println("TECHNIQUE 3 running...");
//TECHNQIUE 3
    	int max3 = 0;
    	int maxword3 = 0; //might need something other than 0
    	int count3 = 0;
        //find word with max anagram
        for(int i = 0; i < words.length - 1; i++) {
        	if(count3 > max3) {
        		max3 = count3;
        		maxword3 = i - 1;
        	}
        	count3 = 0;
        	for (int j = i+1; j < words.length; j++) {
        		if(words[i].length() == words[j].length()) {//if w1 and w2 same length
        			if(technique3(words[i],words[j])) {
        				count3++;
        			}
        		}       		
        	}
        }     
        float estimatedTime3 = (float)(System.nanoTime() - startTime3)/1000000000;
        System.out.println("Technique #3: " + words[maxword3] + " has " + max3 + " anagrams " + estimatedTime3 + " secs");
	}//main end
	

	static boolean technique1(String word1, String word2) {
		StringBuilder sb = new StringBuilder(word2);
		for (int i = 0; i < word1.length(); i++) {
	        for (int j = 0; j < sb.length(); j++) {
	        	if(Character.toLowerCase(word1.charAt(i)) == Character.toLowerCase(sb.charAt(j))) {
	        		sb.deleteCharAt(j);
	        		break;
	        	}		
	        }
	    }
		if(sb.length() == 0) {
			return true;
		} else {
			return false;
		}
	}
	
	static boolean technique2(String word1, String word2) {
		char[] ca1 = word1.toCharArray();
		Arrays.sort(ca1);
		char[] ca2 = word2.toCharArray();
		Arrays.sort(ca2);
		for (int i = 0; i < word1.length(); i++) {
			if(ca1[i] != ca2[i]) {
				return false;
			}
	    }
		return true;		
	}	
	
	static boolean technique3(String word1, String word2) {
		int[]vector = new int[126];
		for(int i = 0; i < word1.length(); i++) {
			vector[(int)(Character.toLowerCase(word1.charAt(i)))]++;		
		}
		for(int i = 0; i < word2.length(); i++) {
			vector[(int)(Character.toLowerCase(word2.charAt(i)))]--;		
		}
		for(int i = 0; i < vector.length; i++) {
			if(vector[i] != 0) {
				return false;
			}
		}
		return true;
	}
}

=============================================================


ArrayList<String> banklist = new ArrayList<String>();
        ArrayList<String> testlist = new ArrayList<String>();
        int count = 0;

        Scanner listScan = new Scanner(new File("lab4_wordlist.txt"));
        Scanner testScan = new Scanner(new File("lab4_testdata.txt"));
        
        while(listScan.hasNext())
        {
            banklist.add(listScan.next());
        }
        
        while(testScan.hasNext())
        {
            testlist.add(testScan.next());
        }


=============================================================

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class SpellChecker {

    public static void main(String[] args) throws FileNotFoundException {
    
        ArrayList<String> banklist = new ArrayList<String>();
        ArrayList<String> testlist = new ArrayList<String>();
        int count = 0;

        Scanner listScan = new Scanner(new File("lab4_wordlist.txt"));
        Scanner testScan = new Scanner(new File("lab4_testdata.txt"));
        
        while(listScan.hasNext())
        {
            banklist.add(listScan.next());
        }
        
        while(testScan.hasNext())
        {
            testlist.add(testScan.next());
        }
        System.out.println(testlist.size());
        System.out.println(banklist.size());

        int num_not_found = 0;

        // Timer
        long startTime1 = System.nanoTime();
        float estimatedTime1;
        // test
        num_not_found = seqSearch(testlist, banklist);
        
        estimatedTime1 = (float) (System.nanoTime() - startTime1) / 1000;
        System.out.println("seqSearch: " + num_not_found + " " + estimatedTime1 + " Microsecond");
        
        // Timer
        long startTime2 = System.nanoTime();
        float estimatedTime2 = 0;
        int num_not_found2 = 0;
        for(int i = 0; i < testlist.size(); i++ ){
            num_not_found2 += binSearch(testlist.get(i), banklist);
        }
        estimatedTime2 = (float) (System.nanoTime() - startTime2) / 1000;
        System.out.println("binSearch: " + num_not_found2 + " " + estimatedTime2 + " Microsecond");
        
    }

    static int seqSearch(ArrayList<String> w1, ArrayList<String> w2) {
        int notfound = 0;
        boolean match = false;
        for (int i = 0; i < w1.size(); i++) {
            match = false;
            for (int j = 0; j < w2.size(); j++) {
                if (w1.get(i).equalsIgnoreCase(w2.get(j))) {
                    match = true;
                    //break;
                }                   
            }
            if(!match) {
                notfound++; 
            }
        }
        return notfound;
    }

    static int binSearch(String s, ArrayList<String> w2) {
        int start = 0;
        int end = w2.size()-1;
        int mid;
        while (start <= end) {
            mid = (start+end)/2;
            if(s.compareToIgnoreCase(w2.get(mid)) > 0 ){
                start = mid + 1;                
            } else if (s.compareToIgnoreCase(w2.get(mid)) < 0 ) {
                end = mid - 1; 
            } else {
                return 0;
            }
        }
        return 1;
    }
}


=============================================================
//lab05

package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class main {
	public static void main(String[] args) throws FileNotFoundException {
		
		
		//ArrayList<String> banklist = new ArrayList<String>();
		ArrayList<Integer> a = new ArrayList<Integer>();
		a.add(2);
		a.add(5);
		a.add(8);
		a.add(3);
		a.add(6);
		a.add(12);
		a.add(9);
		a.add(1);
		a.add(6);
		a.add(5);
		a.add(11);
		
		//find largest
		System.out.println("Array to find largest: 2 5 8 3 6 12 9 1 6 5 11");
		System.out.println("find largest pos: " + find_largest(a,0,a.size()));
		
		//merge sort
		int[] array = {9,8,7,6,5,4,3,2,2,3,1};
		System.out.print("pre-mergeSort result:");
		for(int i = 0; i < array.length; i++) {
			System.out.print(array[i]+ " ");
		}
		System.out.println("");
		mergeSort(array);
		System.out.print("mergeSort result:");
		for(int i = 0; i < array.length; i++) {
			System.out.print(array[i]+ " ");
		}
	}
	
	static int find_largest(ArrayList<Integer> a, int l, int r) {
		if(l == r-1) {
			return l;
		}		
		int midpoint = (int) ((l+r)/2);
		
		int llargest = find_largest(a,l,midpoint);
		int rlargest = find_largest(a,midpoint,r);	
		if (a.get(llargest) > a.get(rlargest))
			return llargest;
		else 
			return rlargest;
	}
	
	static void mergeSort(int[] a) {
		int[] la;
		int[] ra;
		int mid = a.length/2;
		if (a.length > 1) {
			la = Arrays.copyOfRange(a, 0, mid);
			ra = Arrays.copyOfRange(a, mid, a.length);
			mergeSort(la);
			mergeSort(ra);
			merge(la, ra, a);
		}
	}

	private static void merge(int[] la, int[] ra, int[] a) {
		int i = 0, j = 0, k = 0;
		while (i < la.length && j < ra.length) {
			if (la[i] <= ra[j]) {
				a[k] = la[i];
				i++;
			} else {
				a[k] = ra[j];
				j++;
			}
			k++;
		}
		if(j<ra.length) {
			for(int count= j; count<ra.length; count++)
			{
				a[k]= ra[count];
				k++;
			}
		} else {
			for(int count= i; count<la.length; count++)
			{
				a[k]= la[count];
				k++;
			}
		}
	}
}

=============================================================
//1a
FindClosest (A[0…n])

sort the array A
closest = n
for i = 0 to i = n - 1 do
	if A[i+1] - A[i] < n then 
		closest = A[i+1] - A[i]
return closest

//1b
FindClosest (A[0…n])

closest = n
for i = 0 to n do
	for j = 0 to n do
		if A[i] != A[j] then
			if |A[i] - A[j]| < closest then
				closest = |A[i] - A[j]| 

return closest

=============================================================

package test;

import java.util.Comparator;
import java.util.PriorityQueue;

public class main {
    public static void main(String[] args) {
        int[] a = {4, 5, 1, 6, 2, 7, 3, 8};

        //slower nlogn
        FindKSmallest1(a, 4);
        
        //faster logk
        FindKSmallest2(a, 4);

    }
    
    static void FindKSmallest1(int[] a, int k) {
    	MaxComparator pqMaxComparetor1 = new MaxComparator();
        PriorityQueue<Integer> pq = new PriorityQueue<>(a.length, pqMaxComparetor1);
        for (int x : a) {
            pq.offer(x);
        }
        System.out.println("pq1 constructed: " + pq);
        int size = a.length; 
        while(size != k) {
        	pq.poll();
        	size--;
        }
        System.out.println("pq1 result: " + pq);
    }
    
    static void FindKSmallest2(int[] a, int k) {
    	MaxComparator pqMaxComparetor2 = new MaxComparator();
        PriorityQueue<Integer> pq = new PriorityQueue<>(a.length, pqMaxComparetor2);
        
        for (int i = 0; i < a.length; i++) {
        	if (pq.size() < k) {
        		pq.add(a[i]);
        	}
        	else {
        		if (pq.peek() > a[i]) {
        			pq.poll();
        			pq.add(a[i]);
        		}
        	}
        }
        
        System.out.print("pq2 result: " + pq);
    }


    static class MaxComparator implements Comparator<Integer> {

        public int compare(Integer one, Integer two) {
            return two - one;
        }
    }
}

=============================================================


package test;

import java.util.Comparator;
import java.util.PriorityQueue;

public class main {
    public static void main(String[] args) {
        int[] a = {4, 5, 1, 6, 2, 7, 3, 8};

        //slower nlogn
        FindKSmallest1(a, 4);
        
        //faster logk
        FindKSmallest2(a, 4);

    }
    
    static void FindKSmallest1(int[] a, int k) {
    	MaxComparator pqMaxComparetor1 = new MaxComparator();
        PriorityQueue<Integer> pq = new PriorityQueue<>(a.length, pqMaxComparetor1);
        for (int x : a) {
            pq.offer(x);
        }
        System.out.println("pq1 constructed: " + pq);
        int size = a.length; 
        while(size != k) {
        	pq.poll();
        	size--;
        }
        System.out.println("pq1 result: " + pq);
    }
    
    static void FindKSmallest2(int[] a, int k) {
    	MaxComparator pqMaxComparetor2 = new MaxComparator();
        PriorityQueue<Integer> pq = new PriorityQueue<>(a.length, pqMaxComparetor2);
        
        for (int i = 0; i < a.length; i++) {
        	if (pq.size() < k) {
        		pq.add(a[i]);
        	}
        	else {
        		if (pq.peek() > a[i]) {
        			pq.poll();
        			pq.add(a[i]);
        		}
        	}
        }
        
        System.out.print("pq2 result: " + pq);
    }


    static class MaxComparator implements Comparator<Integer> {

        public int compare(Integer one, Integer two) {
            return two - one;
        }
    }
}


public static void method1() {
  System.out.println("Opening file....");
  File file = new File("src/love.txt");
  TreeMap<String, Integer> map = new TreeMap<String, Integer>();
  String word;
  int count;
  
  try {
   Scanner scan = new Scanner(file);
   while(scan.hasNext()){
    word = scan.next();
    if(map.containsKey(word)){
     count = map.get(word);
     count++;
     map.put(word, count);
    }
    else{
     map.put(word, 1);
    }
   } 
  }
  catch (FileNotFoundException e) {
   e.printStackTrace();
  }
  System.out.println("The words are:");
  for (Map.Entry<String, Integer> row : map.entrySet()) {
       System.out.println(row.getKey() + " : " + row.getValue());
  }
 }


=============================================================


 package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class main {
    public static void main(String[] args) throws FileNotFoundException {

        // Question 1
        Map<String, Integer> m = new TreeMap<String, Integer>();
        ArrayList<String> a = new ArrayList<String>();
        Scanner scan = new Scanner(new File("love.txt"));
        
        while(scan.hasNext())
        {
            a.add(scan.next());
        }
        
        String word;
        int count;
        for (int i = 0; i < a.size(); i++) {
            word = a.get(i).toLowerCase();
            if(m.containsKey(word)) {
                count = m.get(word);
                count++;
                m.put(word, count);
            } else {
                m.put(word, 1);
            }
        }

        //print map
        for (Map.Entry<String, Integer> entry : m.entrySet())
        {
            System.out.println(entry.getKey() + " - " + entry.getValue());
        }
        
        
        // Question 2
        System.out.println("");
        HashSet<String> hs = new HashSet<String>();
        Scanner scan2 = new Scanner(new File("q2input.txt"));
        boolean distinct = true;
        while(scan2.hasNext())
        {
            if (hs.contains(scan2.next())) {
                distinct = false;
            } else {
                hs.add(scan2.next());
            }           
        }    
        if(distinct) {
            System.out.println("DISTINCT");
        } else {
            System.out.println("NOT DISTINCT");
        }
        
        // Question 3
        System.out.println("");
        HashSet<String> key = new HashSet<String>();
        HashSet<String> excuse = new HashSet<String>();
        Scanner file = new Scanner(new File("q3Test.txt"));
        String line;
        String words[] = null;
        
        int k = 0; // # of keywords
        int e = 0; // # of excuses
        int row = 1;
        
        while(file.hasNext())
        {
            line = file.nextLine();
            words = line.split(" "); 
            if (row == 1) {
                k = Integer.parseInt(words[0]);
                e = Integer.parseInt(words[1]);
            }
            else if (row < k+2) {
                key.add(words[0]);
            }
            else {
                
            }
        }
    }
}

=============================================================

package lab08;

import java.util.LinkedList;
import java.util.Queue;

public class AdjGraph {
    // PART I
    int matrix[][];
    int V;
    boolean directed = false;

    AdjGraph(int V) {
        matrix = new int[V][V];
        this.V = V;
    }

    public void addEdge(int u, int v) {
        if (directed) {
            matrix[u][v] = 1;
        } else {
            matrix[u][v] = 1;
            matrix[v][u] = 1;
        }
        
    }

    public String toString() {
        String s = "";
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                s += matrix[i][j] + " ";
                if (j == V - 1) {
                    s += "\n";
                }
            }
        }
        return s;
    }

    public int degree(int v) {
        if (directed) {
            return inDegree(v) + outDegree(v);
        } else {
            return inDegree(v);
        }
    }

    public boolean isDirected() {
        return directed;
    }

    public int inDegree(int v) {
        int deg = 0;
        for (int i = 0; i < V; i++) {
            if (matrix[i][v] == 1) {
                deg += matrix[i][v];
            }
        }
        return deg;
    }

    public int outDegree(int v) {
        int deg = 0;
        for (int j = 0; j < V; j++) {
            if(matrix[v][j] == 1) {
                deg += matrix[v][j];
            }
        }
        return deg;
    }
    
    // PART II
    boolean cycle = false;
    int[] visited;
    public void DFS(AdjGraph G) {
        visited = new int[V];
        for (int i = 0; i < V; i++) {
            if(visited[i] != 1) {
                dfs(i);
            }
        }
    }
    
    public void dfs(int v) {
        visited[v] = 1;
        System.out.println("visiting vertex " + v);
        for (int j = 0; j < V; j++) {
            if(matrix[v][j] == 1 && visited[j] == 1 && inDegree(j) > 2) {
                cycle = true;
            }
            if(matrix[v][j] == 1 && visited[j] != 1) {
                dfs(j);
            }
        }
    }
    
    public boolean hasCycle(AdjGraph g) {
        return cycle;
    }

    public void BFS(AdjGraph G) {
        visited = new int[V];
        for (int i = 0; i < V; i++) {
            if (visited[i] != 1) {
                bfs(i);
            }
        }
    }

    Queue queue = new LinkedList();
    public void bfs(int v) {
        visited[v] = 1;
        //initialize a queue Q
        queue.add(v);
        System.out.println("visiting vertex " + v);
        while (!queue.isEmpty()){
            for (int i = 0; i < V; i++) {
                if(matrix[(int) queue.peek()][i] == 1 && visited[i] != 1) {
                    visited[i] = 1;
                    queue.add(i);   
                    System.out.println("visiting vertex " + i);
                }
            }
            queue.remove();
        }
    }
}


package lab08;

public class GraphTest {

    public static void main(String[] args) {
        //PART I
        //g1
        System.out.println("\nPART I\n");
        AdjGraph graph = new AdjGraph(5);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(3, 0);
        graph.addEdge(4, 0);
        graph.addEdge(4, 1);
        graph.addEdge(4, 3);
        System.out.println("degree[0]=" + graph.degree(0));
        System.out.println(graph.toString());
        
        //g2
        AdjGraph graph2 = new AdjGraph(4);
        graph2.addEdge(0, 1);
        graph2.addEdge(2, 1);
        graph2.addEdge(3, 2);
        System.out.println("degree[0]=" + graph2.degree(0));
        System.out.println(graph2.toString());
        
        //g3
        AdjGraph graph3 = new AdjGraph(6);
        graph3.addEdge(2, 0);
        graph3.addEdge(3, 1);
        graph3.addEdge(4, 0);
        graph3.addEdge(4, 2);
        graph3.addEdge(5, 1);
        graph3.addEdge(5, 3);
        System.out.println("degree[0]=" + graph3.degree(0));
        System.out.println(graph3.toString());
        
        System.out.println("\nDirected Graph for above.\nMore examples in PART II for hasCycle.\n");
        AdjGraph graph3d = new AdjGraph(6);
        graph3d.directed = true;
        graph3d.addEdge(2, 0);
        graph3d.addEdge(3, 1);
        graph3d.addEdge(4, 0);
        graph3d.addEdge(4, 2);
        graph3d.addEdge(5, 1);
        graph3d.addEdge(5, 3);
        System.out.println("degree[0]=" + graph3d.degree(0));
        System.out.println("inDegree[0]=" + graph3d.inDegree(0));
        System.out.println("outDegree[0]=" + graph3d.outDegree(0));
        System.out.println(graph3d.toString());     
        
        graph.directed = true;      
        boolean d = graph.isDirected();
        if(d)
            System.out.println("directed=" + d);
        
        //PART II
        System.out.println("\nPART II\n");
        System.out.println("\nDFS\n");
        AdjGraph graph4 = new AdjGraph(8);
        graph4.addEdge(0, 1);
        graph4.addEdge(0, 2);
        graph4.addEdge(0, 4);
        graph4.addEdge(1, 0);
        graph4.addEdge(1, 3);
        graph4.addEdge(1, 5);
        graph4.addEdge(2, 0);
        graph4.addEdge(2, 3);
        graph4.addEdge(2, 6);
        graph4.addEdge(3, 1);
        graph4.addEdge(3, 2);
        graph4.addEdge(3, 7);
        graph4.addEdge(4, 0);
        graph4.addEdge(4, 5);
        graph4.addEdge(4, 6);
        graph4.addEdge(5, 1);
        graph4.addEdge(5, 4);
        graph4.addEdge(5, 7);
        graph4.addEdge(6, 2);
        graph4.addEdge(6, 4);
        graph4.addEdge(6, 7);
        graph4.addEdge(7, 3);
        graph4.addEdge(7, 5);
        graph4.addEdge(7, 6);       
        System.out.println(graph4.toString());
        graph4.DFS(graph4);
        System.out.println("hasCycle=" + graph4.cycle);
        
        System.out.println("\nMore hasCycle() examples\n");
        
        
        AdjGraph graph5 = new AdjGraph(5);
        graph5.cycle = false;
        graph5.directed = true;
        graph5.addEdge(0, 1);
        graph5.addEdge(1, 2);
        graph5.addEdge(2, 3);
        System.out.println(graph5.toString());
        graph5.DFS(graph5);
        System.out.println("hasCycle=" + graph5.cycle + "\n");
        
        AdjGraph graph6 = new AdjGraph(10);
        graph6.cycle = false;
        graph6.directed = false;
        graph6.addEdge(0, 1);
        graph6.addEdge(2, 3);
        graph6.addEdge(8, 9);
        System.out.println(graph6.toString());
        graph6.DFS(graph6);
        System.out.println("hasCycle=" + graph6.cycle + "\n");
        
        AdjGraph graph7 = new AdjGraph(4);
        graph7.cycle = false;
        graph7.directed = true;
        graph7.addEdge(0, 1);
        graph7.addEdge(1, 2);
        graph7.addEdge(2, 1);
        graph7.addEdge(3, 1);
        System.out.println(graph7.toString());  
        graph7.DFS(graph7);
        System.out.println("hasCycle=" + graph7.cycle + "\n");
        
        //BFS
        System.out.println("\nBFS\n");
        graph4.BFS(graph4);
        
    }
}

=============================================================


package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Scanner;
import java.util.Set;

public class main {
	public static void main(String[] args) {

		System.out.println("Opening file1....");
		File file1 = new File("lab0801.txt");

		int line_count = 0;
		int num_of_albums = 0;
		int num_of_tests = 0;
		String[] original = null;
		String[] desired = null;
		
		try {
			Scanner scan = new Scanner(file1);
			while (scan.hasNext()) {				
				if(num_of_tests == 0) {
					num_of_tests = Integer.parseInt((scan.nextLine().trim()));
				}
				
				num_of_albums = Integer.parseInt((scan.nextLine().trim()));
				
				original = new String[num_of_albums];
				desired = new String[num_of_albums];
				
				for(int a = 0; a < num_of_albums; a++) {
					original[a] = scan.nextLine().trim();
				}
				
				for(int b = 0; b < num_of_albums; b++) {
					desired[b] = scan.nextLine().trim();
				}
				
				find_steps(original,desired,num_of_albums);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}		
		
		
		
			
		System.out.println("Opening file2....");
		File file2 = new File("lab0802.txt");
		
		boolean star = false;
		HashMap<String, Integer> map = null;
		ArrayList<String> al = null;
		ArrayList<LinkedList<Integer>> tree = null;
		LinkedList<Integer> ll = null;
		int value = 0;
		String line;
		
		try {
			Scanner scan = new Scanner(file2);
			while (scan.hasNext()) {				
				
				if(num_of_tests == 0) {
					num_of_tests = Integer.parseInt((scan.nextLine().trim()));
				}
				
				if(!star) {
					map = new HashMap<String, Integer>();
					al = new ArrayList<String>();
					tree = new ArrayList<LinkedList<Integer>>();
					ll = new LinkedList<Integer>();
				}				
				
				
				while(!star){
					line = scan.nextLine().trim();
					if(line.equals("*")){
						star = true;
					}
					map.put(line, value);
					al.add(line);
					value++;
				}
				
				String start, end;
				if(star) {
					for(int i = 0; i < 2; i++) {
						start = scan.next();
						end = scan.next();
						
						System.out.println(start + ' ' + end);
						
						//construct nodes?						
						tree = constructTree(tree, al);
						
						//run bfs(tree);
					}
				}				
				
				
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}	
		
		
		
		/*
		linkedlist<integer> graph[];
		for(int i = 0; i < 200; i++) {
			G[i] = new linkedlist<integer>();
			
		Hashmap<string,Integer> map = new ... ();
		
		Index = 0;
		
		while(!scan.readln.equal('*'){
			map(word,index);
			arraylist.add(word);
			for(int i = 0; i < index; i++) {
				if(check(word,arraylist[i]) {
					G[i].add(index);
					G[index].add(i);					
				}
				index++;
				
			}
		}
		//apply BFS
		*/
		
		
		System.out.println("\nProgram End");	
	}
	
	static ArrayList<LinkedList<Integer>> constructTree(ArrayList<LinkedList<Integer>> tree, ArrayList<String> list) {
		return tree;
	}
	
	static boolean isNeighbor(String lhs, String rhs) {
		if(lhs.length() == rhs.length()) {
			int mismatch = 0;
			for(int i = 0; i < lhs.length(); i++) {
				if(lhs.charAt(i) != rhs.charAt(i)) {
					mismatch++;
				}
				if(mismatch == 2) {
					return false;
				}
			}
			return true;
		}		
		return false;
	}
	
	static void find_steps(String[] original, String[] desired, int size) {
		int i = size-1;
		int j = size-1;
		
		while(i > -1) {
			if(original[i].equals(desired[j])) {
				i--;
				j--;
			} else {
				i--;
			}
		}
		while(j>-1) {
			System.out.println(desired[j]);
			j--;
		}
		System.out.println();		
	}
	
	/*
	public void BFS(ArrayList<Integer> nodes) {
        int[] visited = new int[nodes.size()];
        for (int i = 0; i < nodes.size(); i++) {
            if (visited[i] != 1) {
                bfs(i);
            }
        }
    }
	
    public void bfs(int v) {
        visited[v] = 1;
        //initialize a queue Q
        queue.add(v);
        System.out.println("visiting vertex " + v);
        while (!queue.isEmpty()){
            for (int i = 0; i < V; i++) {
                if(matrix[(int) queue.peek()][i] == 1 && visited[i] != 1) {
                    visited[i] = 1;
                    queue.add(i);   
                    System.out.println("visiting vertex " + i);
                }
            }
            queue.remove();
        }
    }*/
}


=============================================================


