===============================================================
//LAB01
//Change background color on click

private final static String TAG = MainActivity.class.getName();
private String DAKKA = "DAKKA";
private String MOAR_DAKKA = "MOAR DAKKA!";
private int color = Color.BLUE;
TextView text;
RelativeLayout mainLayout;


setContentView(R.layout.activity_main);
mainLayout = (RelativeLayout) findViewById(R.id.mainActivity);

public void doDumb(final View view)
{
    //Log.d(TAG, MOAR_DAKKA);

    text = (TextView) findViewById(R.id.textView);

    if(text.getText().toString().equalsIgnoreCase(MOAR_DAKKA)){
        text.setText(DAKKA);
    } else {
        text.setText(MOAR_DAKKA);
    }

    //randomColor();

    // Get Background color of current activity window
    getWindow().getDecorView().setBackgroundColor(color);

    mainLayout.setBackgroundColor(Color.BLUE);
}


private void randomColor()
{
    Random rnd = new Random();
    color = Color.argb(255, rnd.nextInt(256), rnd.nextInt(256), rnd.nextInt(256));
}

===============================================================
//basic activity

package ca.bcit.activity101;
import android.app.Activity;
import android.os.Bundle;
public class Activity101 extends Activity
{
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_activity101);
    }
}

===============================================================
//intent

//intent filter
<action android:name="android.intent.action.MAIN" />
    //The main activity of the app

<category android:name="android.intent.category.LAUNCHER" />
    //the activity can be used to launch the app

//get message
final EditText messageView;
final String   message;
final Intent   intent;

messageView = (EditText)findViewById(R.id.message_text);
message     = messageView.getText().toString();
intent      = new Intent(this, ReceiveMessageActivity.class);
intent.putExtra("message", message);
startActivity(intent);


//displaying message
final Intent   intent;
final String   message;
final TextView messageView;

super.onCreate(savedInstanceState);
setContentView(R.layout.activity_receive_message);
intent      = getIntent();
message     = intent.getStringExtra("message");
messageView = (TextView)findViewById(R.id.message_text);
messageView.setText(message);



final EditText messageView;
final String   message;
final Intent   intent;

messageView = (EditText)findViewById(R.id.message_text);
message     = messageView.getText().toString();
intent      = new Intent(Intent.ACTION_WEB_SEARCH);
intent.putExtra(SearchManager.QUERY, message);
startActivity(intent);


//returning a value
    //In the main activity:

public static final int UPPERCASE_REQUEST = 1;
startActivityForResult(intent, UPPERCASE_REQUEST);

public void uppercase(final View view)
{
    final Intent returnIntent;
    final String message;

    returnIntent = new Intent();
    message      = messageView.getText().toString();
    returnIntent.putExtra("result", message.toUpperCase());
    setResult(RESULT_OK, returnIntent);
    finish();
}



===============================================================
//lab 02: Intent, Toast, Serial

//MainActivity
public class MainActivity extends AppCompatActivity {

    private Intent intent;
    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button = (Button) findViewById(R.id.main_button);
        button.setOnClickListener(btnListener);
        intent = new Intent(this, NewActivity.class);
    }

    private View.OnClickListener btnListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            startActivity(intent);
        }
    };
}

//NewActivity
public class NewActivity extends AppCompatActivity {

    private Button button;
    private String serial;
    private Context context;
    private int duration;
    private Toast toast;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new);
        button = (Button) findViewById(R.id.new_button);
        button.setOnClickListener(btnListener);
    }

    private View.OnClickListener btnListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {

            String serial = Settings.System.getString(getContentResolver(), Settings.System.ANDROID_ID);
            //serial = Build.SERIAL;

            context = getApplicationContext();
            duration = Toast.LENGTH_SHORT;
            toast = Toast.makeText(context, serial, duration);
            toast.show();
        }
    };
}
===============================================================
//OnClickListener with XML


public class MyTest extends Activity implements OnClickListener{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
     //... some other code here to init the layout
        Button btn1 = (Button)findViewById(R.id.button1);
        Button btn2 = (Button)findViewById(R.id.button2);
        btn1.setOnClickListener(this);
        btn2.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch(v.getId()){
            case R.id.button1:
                break;
            case R.id.button2:
                break;
        }
    }
}


===============================================================
//AsyncTask

	private class DownloadFilesTask extends AsyncTask<URL, Integer, Long> {
		protected Long doInBackground(URL... urls) {
			int count = urls.length;
			long totalSize = 0;
			for (int i = 0; i < count; i++) {
				totalSize += Downloader.downloadFile(urls[i]);
				publishProgress((int) ((i / (float) count) * 100));
				// Escape early if cancel() is called
				if (isCancelled()) break;
			}
			return totalSize;
		}

		protected void onProgressUpdate(Integer... progress) {
			setProgressPercent(progress[0]);
		}

		protected void onPostExecute(Long result) {
			showDialog("Downloaded " + result + " bytes");
		}
	}
 

//Once created, a task is executed very simply:

	new DownloadFilesTask().execute(url1, url2, url3);


//Async generic

	private class MyTask extends AsyncTask<Void, Void, Void> { ... }

//4 AsyncSteps


    onPreExecute(), 
    	invoked on the UI thread before the task is executed. This step is normally used to setup the task, for instance by showing a progress bar in the user interface.

    doInBackground(Params...), 
    	invoked on the background thread immediately after onPreExecute() finishes executing. This step is used to perform background computation that can take a long time. The parameters of the asynchronous task are passed to this step. The result of the computation must be returned by this step and will be passed back to the last step. This step can also use publishProgress(Progress...) to publish one or more units of progress. These values are published on the UI thread, in the onProgressUpdate(Progress...) step.

    onProgressUpdate(Progress...), 
    	invoked on the UI thread after a call to publishProgress(Progress...). The timing of the execution is undefined. This method is used to display any form of progress in the user interface while the background computation is still executing. For instance, it can be used to animate a progress bar or show logs in a text field.

    onPostExecute(Result), 
    	invoked on the UI thread after the background computation finishes. The result of the background computation is passed to this step as a parameter.



===============================================================
//ListActivity, ListView to change background color of list cell

public class MainActivity extends ListActivity {

    private ListView listView;
    private int pos;
    private AlertDialog.Builder alertDialog;
    private String itemClicked;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
/*
        ArrayList<String> items = new ArrayList<String>();
        items.add("BLACK"); ...
*/
        String[] colorItems = { "BLACK", "BLUE", "CYAN", "DKGRAY", "GRAY", "GREEN", "LTGRAY", "MAGENTA", "RED", "TRANSPARENT", "WHITE", "YELLOW" };

        listView = getListView();
        ArrayAdapter<String> listAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, colorItems);
        listView.setAdapter(listAdapter);
        listView.setOnItemClickListener(itemClickListener);

    }

    private AdapterView.OnItemClickListener itemClickListener = new AdapterView.OnItemClickListener() {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

            itemClicked = (String) parent.getItemAtPosition(position);
            pos = position;

            AlertDialog.Builder alertDialog = new AlertDialog.Builder(MainActivity.this);

            alertDialog.setTitle("Color");
            alertDialog.setPositiveButton("OK", positiveListener);
            alertDialog.setNeutralButton("Cancel", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.cancel();
                }
            });

            alertDialog.show();
        }
    };

    private DialogInterface.OnClickListener positiveListener = new DialogInterface.OnClickListener() {
        public void onClick(DialogInterface dialog, int which) {

            switch(itemClicked) {
                case "BLACK":
                    listView.getChildAt(pos).setBackgroundColor(Color.BLACK); break;
                case "BLUE":
                    listView.getChildAt(pos).setBackgroundColor(Color.BLUE); break;
                default:
                    break;
            }
        }
    };
}

===============================================================
@Test
public void BuildAddressShouldThrowIllegalArgumentExceptionIfBuildingNumberIsZero(){
    final int zeroBuildingNumber = 0;

    expectedException.expect(IllegalArgumentException.class);

    sut.buildAddress(firstName,lastName,zeroBuildingNumber,streetName,cityName,countryName,postalCode);
}


@Test
public void BuildAddressShouldAllowStreetNamesWithNumbersAndSpecialCharacters(){
    final String legalStreetName = "1st Ave. W";
    final String legalStreetName2 = "Main Street";
    final String legalStreetName3 = "Duncan Blvd.";

    sut.buildAddress(firstName,lastName,buildingNumber,legalStreetName,cityName,countryName,postalCode);
    sut.buildAddress(firstName,lastName,buildingNumber,legalStreetName2,cityName,countryName,postalCode);
    sut.buildAddress(firstName,lastName,buildingNumber,legalStreetName3,cityName,countryName,postalCode);
}

===============================================================
//Unit Test

//AddressBuilderUnitTest.java
import org.junit.Test;
import java.io.File;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class AddressBuilderUnitTest 
{
    @Test
    public void validAddress() throws InvalidAddressException { //Custom Exception
        final AddressBuilder builder;
        final String addressA;

        builder = new AddressBuilder();
        addressA = builder.buildAddress("John",
                "Doe",
                123,
                "Some Street",
                "Some City",
                "Some Province",
                "Some Country",
                "12345");

        assertThat(addressA, is("Doe, John" + File.separator +
                "123, Some Street" + File.separator +
                "Some City" + File.separator +
                "Some Province" + File.separator +
                "Some Country" + File.separator +
                "12345"));
        //addressB = builder.buildAddress("Jane"...
        //assertThat(addressB, is("Doe, ...
    }
}

//InvalidAddressException.java
public class InvalidAddressException extends Exception {
    public InvalidAddressException(final String msg) {
        super(msg);
    }
}

//Checks.java
public final class Checks 
{
    private Checks() {}

    public static final void checkNotNullOrEmpty(final String name, 
                                                 final String value) 
        throws InvalidAddressException 
    {
        if(value == null) {
            throw new InvalidAddressException(name + " cannot be null");
        }

        if(value.isEmpty()) {
            throw new InvalidAddressException(name + " cannot be empty");
        }
    }

    public static final void checkPositive(final String name,
                                           final int    value)
        throws InvalidAddressException
    {
        if(value < 1)
        {
            throw new InvalidAddressException(name + " must be > 0, was: " + value);
        }
    }
}

//AddressBuilder
public class AddressBuilder
{
    public String buildAddress(final String firstName,
                               final String lastName,
                               final int    buildingNumber,
                               final String streetName,
                               final String cityName,
                               final String provinceName,
                               final String countryName,
                               final String postalCode)
        throws InvalidAddressException
    {
        final StringBuilder builder;

        Checks.checkNotNullOrEmpty("firstName",    firstName);
        Checks.checkNotNullOrEmpty("lastName",     lastName);
        Checks.checkPositive("buildingNumber",     buildingNumber);
        Checks.checkNotNullOrEmpty("streetName",   streetName);
        Checks.checkNotNullOrEmpty("cityName",     cityName);
        Checks.checkNotNullOrEmpty("provinceName", provinceName);
        Checks.checkNotNullOrEmpty("countryName",  countryName);
        Checks.checkNotNullOrEmpty("postalCode",   postalCode);

        builder = new StringBuilder();
        builder.append(lastName);
        builder.append(", ");
        builder.append(firstName);
        builder.append(File.separator);
        builder.append(buildingNumber);
        builder.append(", ");
        builder.append(streetName);
        builder.append(File.separator);
        builder.append(cityName);
        builder.append(File.separator);
        builder.append(provinceName);
        builder.append(File.separator);
        builder.append(countryName);
        builder.append(File.separator);
        builder.append(postalCode);

        return (builder.toString());
    }
}

===============================================================
//RecyclerView
//Add RecyclerView to a layout
<!-- A RecyclerView with some commonly used attributes -->
<android.support.v7.widget.RecyclerView
    android:id="@+id/my_recycler_view"
    android:scrollbars="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>

//Add Dependencies
dependencies {
    ...
    compile 'com.android.support:cardview-v7:21.0.+'
    compile 'com.android.support:recyclerview-v7:21.0.+'
}

//MyActivity.java
public class MyActivity extends Activity {
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.my_activity);
        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        mRecyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        // specify an adapter (see also next example)
        mAdapter = new MyAdapter(myDataset);
        mRecyclerView.setAdapter(mAdapter);
    }
}

//MyAdapter
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
    private String[] mDataset;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class ViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView mTextView;
        public ViewHolder(TextView v) {
            super(v);
            mTextView = v;
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public MyAdapter(String[] myDataset) {
        mDataset = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public MyAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
                                                   int viewType) {
        // create a new view
        View v = LayoutInflater.from(parent.getContext())
                               .inflate(R.layout.my_text_view, parent, false);
        // set the view's size, margins, paddings and layout parameters
        ...
        ViewHolder vh = new ViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        holder.mTextView.setText(mDataset[position]);

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.length;
    }
}

//RecyclerViewLayoutManager.java 
//Extend RecyclerView.LayoutManager for custom layout manager


//RecyclerView.ItemAnimator



===============================================================
//Media Player Project

private FilenameFilter musicFilter = new FilenameFilter() {
        @Override
        public boolean accept(File dir, String fileName) {
            File file;

            if(     fileName.endsWith(".mp3")   ||
                    fileName.endsWith(".flac")  ||
                    fileName.endsWith(".wav")   ){
                return true;
            }
            file = new File(dir.getAbsolutePath()+"/"+fileName);

            return file.isDirectory();
        }
    };

===============================================================
//SQLite

//SQLiteOpenHelper
public class DatabaseHelper extends SQLiteOpenHelper {
    // If you change the database schema, you must increment the database version.
    private static final String     DATABASE_NAME           = "TEST_DB.DB";
    private static final int        DATABASE_VERSION        = 1;

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    private static final String     SQL_CREATE_ENTRIES =
            "CREATE TABLE IF NOT EXISTS "                                               +
            Test.TABLE_NAME                                                             +
            "("                                                                         +
                Test._ID                    + " INTEGER PRIMARY KEY AUTOINCREMENT, "    +
                Test.COLUMN_NAME_TITLE      + " TEXT NOT NULL, "                        +
                Test.COLUMN_NAME_SUBTITLE   + " TEXT NOT NULL "                         +
            ")";

    private static final String     SQL_DELETE_ENTRIES =
            "DROP TABLE IF EXISTS " + Test.TABLE_NAME;

    @Override
    public void onConfigure(final SQLiteDatabase db) {
        super.onConfigure(db);
        
        setWriteAheadLoggingEnabled(true);
        db.setForeignKeyConstraintsEnabled(true);
    }        

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(SQL_CREATE_ENTRIES);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // This database is only a cache for online data, so its upgrade policy is
        // to simply to discard the data and start over
        db.execSQL(SQL_DELETE_ENTRIES);
        onCreate(db);
    }

    @Override
    public void onDowngrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        onUpgrade(db, oldVersion, newVersion);
    }

    // Inner class that defines the table contents
    public static class Test implements BaseColumns {
        public static final String     TABLE_NAME              = "TEST";
        public static final String     COLUMN_NAME_TITLE       = "TITLE";
        public static final String     COLUMN_NAME_SUBTITLE    = "TIME";
    }
}

//CREATE, RETREIVE, UPDATE, DELETE
public class MainActivity extends AppCompatActivity {

    SQLiteDatabase          db;
    DatabaseHelper          databaseHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Instantiate subclass of SQLiteOpenHelper
        databaseHelper = new DatabaseHelper(this);

    // PUT INFORMATION INTO A DATABASE

        // Gets the data repository in write mode
        db = databaseHelper.getWritableDatabase();

        // Create a new map of values, where column names are the keys
        ContentValues values = new ContentValues();
        values.put(DatabaseHelper.Test.COLUMN_NAME_TITLE,    "my title");
        values.put(DatabaseHelper.Test.COLUMN_NAME_SUBTITLE, "my subtitle");

        // Insert the new row, returning the primary key value of the new row
        long newRowId = db.insert(DatabaseHelper.Test.TABLE_NAME, null, values);

    // READ INFORMATION FROM A DATABASE

        // Define a projection that specifies which columns from the database
        // you will actually use after this query.
        String[] projection = {
                DatabaseHelper.Test._ID,
                DatabaseHelper.Test.COLUMN_NAME_TITLE,
                DatabaseHelper.Test.COLUMN_NAME_SUBTITLE
        };

        // Filter results WHERE "title" = 'my title'
        String      selection = DatabaseHelper.Test.COLUMN_NAME_TITLE + " = ?";
        String[]    selectionArgs = { "my title" };

        // How you want the results sorted in the resulting Cursor
        String      sortOrder = DatabaseHelper.Test.COLUMN_NAME_SUBTITLE + " DESC";

        Cursor cursor = db.query(
                DatabaseHelper.Test.TABLE_NAME,           // The table to query
                projection,                               // The columns to return
                selection,                                // The columns for the WHERE clause
                selectionArgs,                            // The values for the WHERE clause
                null,                                     // don't group the rows
                null,                                     // don't filter by row groups
                sortOrder                                 // The sort order
        );

        // For each row, you can read a column's value by calling one of the Cursor get methods, such as getString() or getLong().
        // For each of the get methods, you must pass the index position of the column you desire, which you can get by calling getColumnIndex() or getColumnIndexOrThrow().
        cursor.moveToFirst();
        long itemId = cursor.getLong(
                cursor.getColumnIndexOrThrow(DatabaseHelper.Test._ID)
        );

    // DELETE INFORMATION FROM A DATABASE (Immune to SQL Injection!)

        // Define 'where' part of query.
        String deleteSelection = DatabaseHelper.Test.COLUMN_NAME_TITLE + " LIKE ?";

        // Specify arguments in placeholder order.
        String[] deleteSelectionArgs = { "my title" };

        // Issue SQL statement.
        db.delete(DatabaseHelper.Test.TABLE_NAME, selection, selectionArgs);

    // UPDATE A DATABASE

        // New value for one column
        values = new ContentValues();
        values.put(DatabaseHelper.Test.COLUMN_NAME_TITLE, "new title");

        // Which row to update, based on the title
        String updateSelection = DatabaseHelper.Test.COLUMN_NAME_TITLE + " LIKE ?";
        String[] updateSelectionArgs = { "my title" };

        int count = db.update(
                DatabaseHelper.Test.TABLE_NAME,
                values,
                selection,
                selectionArgs);

        db.close();
    }
}
===============================================================
//SQLite CourseInformation Assignment

//SQLiteOpenHelper
public class DatabaseHelper extends SQLiteOpenHelper {

    //Singleton
    private static DatabaseHelper singletonInstance;

    // If you change the database schema, you must increment the database version.
    private static final String     DATABASE_NAME           = "COURSE_DB.DB";
    private static final int        DATABASE_VERSION        = 1;

    public static synchronized DatabaseHelper getInstance(Context context) {
        // Use the application context, which will ensure that you
        // don't accidentally leak an Activity's context.
        // See this article for more information: http://bit.ly/6LRzfx
        if (singletonInstance == null) {
            singletonInstance = new DatabaseHelper(context.getApplicationContext());
        }
        return singletonInstance;
    }

    /**
     * Constructor should be private to prevent direct instantiation.
     * make call to static method "getInstance()" instead.
     */
    private DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    // Inner class that defines the table contents
    public static class Course implements BaseColumns {
        public static final String     TABLE_NAME              = "COURSE";
        public static final String     COURSE_LABEL            = "NAME";
        public static final String     TERM                    = "TERM";
        public static final String     COURSE_NAME             = "COURSE_NAME";
        public static final String     COURSE_DESCRIPTION      = "COURSE_DESCRIPTION";
    }
    private static final String     SQL_CREATE_COURSE =
            "CREATE TABLE IF NOT EXISTS "                                                     +
                    Course.TABLE_NAME                                                         +
                    " ("                                                                      +
                    Course._ID                    + " INTEGER PRIMARY KEY AUTOINCREMENT, "    +
                    Course.COURSE_LABEL           + " TEXT NOT NULL, "                        +
                    Course.TERM                   + " TEXT NOT NULL, "                        +
                    Course.COURSE_NAME            + " TEXT NOT NULL, "                        +
                    Course.COURSE_DESCRIPTION     + " TEXT NOT NULL "                         +
                    ")";

    private static final String     SQL_DELETE_COURSE =
            "DROP TABLE IF EXISTS " + Course.TABLE_NAME;

    @Override
    public void onConfigure(final SQLiteDatabase db) {
        super.onConfigure(db);
        //setWriteAheadLoggingEnabled(true);
        //db.setForeignKeyConstraintsEnabled(true);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(SQL_CREATE_COURSE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // This database is only a cache for online data, so its upgrade policy is
        // to simply to discard the data and start over
        db.execSQL(SQL_DELETE_COURSE);
        onCreate(db);
    }

    @Override
    public void onDowngrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        onUpgrade(db, oldVersion, newVersion);
    }
}


//MainActivity
private ListView                listView;
private String                  termSelected; //1-4
private Intent                  intent;
private SQLiteDatabase          db;
private DatabaseHelper          databaseHelper;
private ArrayList<String>       terms;
private Cursor   				cursor;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    //Initialize
    terms = new ArrayList<>();
    databaseHelper = DatabaseHelper.getInstance(this);
    initializeDB();
    getData();

    listView = getListView();
    ArrayAdapter<String> listArrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, terms);

    listView.setAdapter(listArrayAdapter);
    listView.setOnItemClickListener(termClickListener);
    intent = new Intent(this, CourseActivity.class);
}

private AdapterView.OnItemClickListener termClickListener = new AdapterView.OnItemClickListener() {
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        termSelected = (String) parent.getItemAtPosition(position);
        intent.putExtra("termSelected", termSelected);
        startActivity(intent);
    }
};

private void getData() {
    db = databaseHelper.getReadableDatabase();

    // Define a projection that specifies which columns from the database
    // you will actually use after this query.
    String[] projection = {
            DatabaseHelper.Course.TERM
    };

    cursor = db.query(
            true,
            DatabaseHelper.Course.TABLE_NAME,         // The table to query
            projection,                               // The columns to return
            null,                                     // The columns for the WHERE clause
            null,                                     // The values for the WHERE clause
            null,                                     // don't group the rows
            null,                                     // don't filter by row groups
            null,                                     // The sort order
            null,
            null
    );

    // For each row, you can read a column's value by calling one of the Cursor get methods, such as getString() or getLong().
    // For each of the get methods, you must pass the index position of the column you desire, which you can get by calling getColumnIndex() or getColumnIndexOrThrow().
    try {
        while (cursor.moveToNext()) {
            terms.add(cursor.getString(cursor.getColumnIndex(DatabaseHelper.Course.TERM)));
        }
    }
    finally {
        cursor.close();
        db.close();
    }
}

private void initializeDB() {
    //Show all tables in current database
    showTables();
    //Check if table is already initalized
    if(verifyDBPopulated() == 0) {
        bulkInsert();
    }
}

public void showTables() {
    db = databaseHelper.getReadableDatabase();
    cursor = db.rawQuery("SELECT name FROM sqlite_master WHERE type='table'", null);
    if (cursor.moveToFirst()) {
        while ( !cursor.isAfterLast() )
            cursor.moveToNext();        
    }
    cursor.close();
    db.close();
}

private int verifyDBPopulated() {
    db = databaseHelper.getReadableDatabase();
    int count = (int) DatabaseUtils.queryNumEntries(db, DatabaseHelper.Course.TABLE_NAME);
    db.close();
    return count;
}

private void bulkInsert() {
    // Instantiate subclass of SQLiteOpenHelper
    db = databaseHelper.getWritableDatabase();

    // Create a new map of values, where column names are the keys
    for (int i = 0; i < courseLabel.length; i++) {
        try {
            db.beginTransaction();
            ContentValues values = new ContentValues();
            values.put(DatabaseHelper.Course.COURSE_LABEL, courseLabel[i]);
            values.put(DatabaseHelper.Course.TERM, insertTerm(i));
            values.put(DatabaseHelper.Course.COURSE_NAME, courseName[i]);
            values.put(DatabaseHelper.Course.COURSE_DESCRIPTION, courseDescription[i]);
            db.insertOrThrow(DatabaseHelper.Course.TABLE_NAME, null, values);
            db.setTransactionSuccessful();
        } catch (IllegalStateException e) {
            //error
        } finally {
            db.endTransaction();
        }
    }
    db.close();
}
===============================================================
//JSON basics

//JSON sample
/*{
    "operation": {
      "add" : {
         "a" : 1,
         "b" : 2
      }
    }
}*/

public class MainActivity extends AppCompatActivity {

    private String TAG;
    private EditText jsonText;
    private Operation operation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TAG = MainActivity.class.getName();
        jsonText = (EditText) findViewById(R.id.jsonEditText);
    }

    public void parseJSON(final View view) {

        JSONObject json;
        final String text;
        int result = 0;

        text = jsonText.getText().toString();

        try {
            json = new JSONObject(text);
            operation = new Operation(json);
        } catch (JSONException ex) {
            //bad
        }
        result = operation.add.get(0) + operation.add.get(1);
        Toast.makeText(this, "sum= " + result, Toast.LENGTH_LONG).show();
    }
}

class Operation {

    public ArrayList<Integer> add = new ArrayList<>();
    private int a, b;

    Operation(JSONObject json) {
        try {
            this.a = json.getJSONObject("operation").getJSONObject("add").getInt("a");
            this.b = json.getJSONObject("operation").getJSONObject("add").getInt("b");
            add.add(a);
            add.add(b);
        } catch (JSONException ex) {
            //bad
        }
    }
}
===============================================================
//REST API
//Ion 

//MainActivity
public class MainActivity
    extends AppCompatActivity
{

    private ArrayList<String> countryList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void jsonRequest(final View view)
    {
        Ion.with(this).
            load("http://services.groupkt.com/country/get/all").
            asJsonObject().
            setCallback(
                new FutureCallback<JsonObject>()
            {
                @Override
                public void onCompleted(final Exception ex,
                                        final JsonObject obj)
                {
                    if(ex != null)
                    {
                        Toast.makeText(MainActivity.this,
                                       "Error: " + ex.getMessage(),
                                       Toast.LENGTH_LONG).show();
                    }
                    else
                    {
                        final JsonObject  json;
                        final JsonArray   jsonArray;

                        json = obj.getAsJsonObject("RestResponse");
                        jsonArray = json.getAsJsonArray("result");

                        for(final JsonElement element : jsonArray)
                        {
                            final JsonObject  jsonNameObj;
                            final JsonElement nameElement;
                            final String      name;

                            jsonNameObj       = element.getAsJsonObject();
                            nameElement       = jsonNameObj.get("name");

                            name = nameElement.getAsString();
                            countryList.add(name);
                        }
                    }

                    String[] arr = countryList.toArray(new String[countryList.size()]);

                    Bundle bundle = new Bundle();
                    bundle.putStringArray("KEY", arr);
                    Intent intent = new Intent(MainActivity.this, NewActivity.class);
                    intent.putExtras(bundle);
                    startActivity(intent);
                }
            });
    }
}

//NewActivity
public class NewActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new);

        String[] countries = this.getIntent().getExtras().getStringArray("KEY");

        ListView listView = (ListView) findViewById(R.id.list);
        ArrayAdapter<String> listAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, countries);
        listView.setAdapter(listAdapter);
    }
}
===============================================================
//Camera Permission

public class MainActivity
    extends AppCompatActivity
{
    private static final String TAG = MainActivity.class.getName();
    Preview preview;
    private Camera camera;
    private int cameraId;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        final Camera.PictureCallback jpegCallback;

        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_main);
        preview = new Preview(this, (SurfaceView)findViewById(R.id.surfaceView));
        preview.setLayoutParams(new ActionBar.LayoutParams(ActionBar.LayoutParams.MATCH_PARENT, ActionBar.LayoutParams.MATCH_PARENT));
        ((FrameLayout) findViewById(R.id.activity_main)).addView(preview);
        preview.setKeepScreenOn(true);

        jpegCallback = new Camera.PictureCallback()
        {
            public void onPictureTaken(final byte[] data,
                                       final Camera camera)
            {
                new SaveImageTask().execute(data);
                resetCam();
                Log.d(TAG, "onPictureTaken - jpeg");
            }
        };

        preview.setOnClickListener(new View.OnClickListener()
        {

            @Override
            public void onClick(View view)
            {
                if(camera != null)
                {
                    camera.takePicture(null,
                                       // ShutterCallback shutter
                                       null,
                                       // PictureCallback raw,
                                       null,
                                       // PictureCallback postview,
                                       jpegCallback); // PictureCallback jpeg);
                }
            }
        });
    }

    @Override
    protected void onResume()
    {
        super.onResume();
        getCamera(CameraInfo.CAMERA_FACING_BACK);

        if(camera != null)
        {
            camera.startPreview();
            preview.setCamera(camera);
        }
    }

    @Override
    protected void onPause()
    {
        if(camera != null)
        {
            camera.stopPreview();
            preview.setCamera(null);
            camera.release();
            camera = null;
        }

        super.onPause();
    }

    private void getCamera(final int desiredCamera)
    {
        if(!getPackageManager()
            .hasSystemFeature(PackageManager.FEATURE_CAMERA))
        {
            Toast.makeText(this, "No camera on this device", Toast.LENGTH_LONG)
                .show();
        }
        else
        {
            cameraId = findCamera(desiredCamera);

            if(cameraId < 0)
            {
                Toast.makeText(this, "Camera no found.",
                               Toast.LENGTH_LONG).show();
            }
            else
            {
                Log.d(TAG, Integer.toString(cameraId));
                camera = Camera.open(cameraId);
                camera.setDisplayOrientation(90);
            }
        }
    }

    private int findCamera(final int desiredCamera)
    {
        final int numberOfCameras;
        int       cameraId;

        numberOfCameras = Camera.getNumberOfCameras();
        cameraId        = -1;

        for(int i = 0; i < numberOfCameras; i++)
        {
            final CameraInfo info;

            info = new CameraInfo();
            Camera.getCameraInfo(i, info);

            if(info.facing == desiredCamera)
            {
                Log.d(TAG, "Camera found");
                cameraId = i;
                break;
            }
        }

        return (cameraId);
    }

    private void resetCam()
    {
        camera.startPreview();
        preview.setCamera(camera);
    }

    private void refreshGallery(final File file)
    {
        final Intent mediaScanIntent;

        mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        mediaScanIntent.setData(Uri.fromFile(file));
        sendBroadcast(mediaScanIntent);
    }

    private class SaveImageTask
        extends AsyncTask<byte[], Void, Void>
    {
        @Override
        protected Void doInBackground(final byte[]... data)
        {
            FileOutputStream outStream;
            final File       sdCard;
            final File       dir;
            final String     fileName;
            final File       outFile;

            sdCard = Environment.getExternalStorageDirectory();
            dir    = new File (sdCard.getAbsolutePath() + "/camtest");
            dir.mkdirs();

            fileName  = String.format("%d.jpg", System.currentTimeMillis());
            outFile   = new File(dir, fileName);
            outStream = null;

            try
            {
                outStream = new FileOutputStream(outFile);
                outStream.write(data[0]);
                outStream.flush();

                Log.d(TAG, "onPictureTaken - wrote bytes: " + data.length + " to " + outFile.getAbsolutePath());
                refreshGallery(outFile);
            }
            catch(final FileNotFoundException ex)
            {
                Log.e(TAG, "File not found", ex);
            }
            catch(final IOException ex)
            {
                Log.e(TAG, "IOException", ex);
            }
            finally
            {
                try
                {
                    if(outStream != null)
                    {
                        outStream.close();
                    }
                }
                catch(final IOException ex)
                {
                    Log.e(TAG, "IOException", ex);
                }
            }

            return null;
        }

    }
}


//Preview

class Preview
    extends ViewGroup
    implements Callback
{
    private final String TAG = Preview.class.getName();
    private SurfaceView surfaceView;
    private SurfaceHolder holder;
    private Camera.Size previewSize;
    private List<Camera.Size> supportedPreviewSizes;
    private Camera camera;

    Preview(final Context     context,
            final SurfaceView sv)
    {
        super(context);

        surfaceView = sv;
        holder      = surfaceView.getHolder();
        holder.addCallback(this);
        holder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
    }

    public void setCamera(Camera camera)
    {
        this.camera = camera;

        if(this.camera != null)
        {
            final Camera.Parameters params;
            final List<String>      focusModes;

            supportedPreviewSizes = this.camera.getParameters().getSupportedPreviewSizes();
            requestLayout();

            params     = this.camera.getParameters();
            focusModes = params.getSupportedFocusModes();

            if(focusModes.contains(Camera.Parameters.FOCUS_MODE_AUTO))
            {
                params.setFocusMode(Camera.Parameters.FOCUS_MODE_AUTO);
                this.camera.setParameters(params);
            }
        }
    }

    @Override
    protected void onMeasure(final int widthMeasureSpec,
                             final int heightMeasureSpec)
    {
        // We purposely disregard child measurements because act as a
        // wrapper to a SurfaceView that centers the camera preview instead
        // of stretching it.
        final int width;
        final int height;

        width  = resolveSize(getSuggestedMinimumWidth(), widthMeasureSpec);
        height = resolveSize(getSuggestedMinimumHeight(), heightMeasureSpec);
        setMeasuredDimension(width, height);

        if(supportedPreviewSizes != null)
        {
            previewSize = getOptimalPreviewSize(supportedPreviewSizes, width, height);
        }
    }

    @Override
    protected void onLayout(boolean changed,
                            int l,
                            int t,
                            int r,
                            int b)
    {
        if (changed && getChildCount() > 0)
        {
            final View child = getChildAt(0);

            final int width = r - l;
            final int height = b - t;

            int previewWidth = width;
            int previewHeight = height;

            if (previewSize != null)
            {
                previewWidth = previewSize.width;
                previewHeight = previewSize.height;
            }

            // Center the child SurfaceView within the parent.
            if (width * previewHeight > height * previewWidth)
            {
                final int scaledChildWidth = previewWidth * height / previewHeight;
                child.layout((width - scaledChildWidth) / 2, 0,
                             (width + scaledChildWidth) / 2, height);
            }
            else
            {
                final int scaledChildHeight = previewHeight * width / previewWidth;
                child.layout(0, (height - scaledChildHeight) / 2,
                             width, (height + scaledChildHeight) / 2);
            }
        }
    }

    public void surfaceCreated(SurfaceHolder holder)
    {
        // The Surface has been created, acquire the camera and tell it where
        // to draw.
        try
        {
            if(camera != null)
            {
                camera.setPreviewDisplay(holder);
            }
        }
        catch (IOException exception)
        {
            Log.e(TAG, "IOException caused by setPreviewDisplay()", exception);
        }
    }

    public void surfaceDestroyed(SurfaceHolder holder)
    {
        // Surface will be destroyed when we return, so stop the preview.
        if(camera != null)
        {
            camera.stopPreview();
        }
    }

    private Camera.Size getOptimalPreviewSize(List<Camera.Size> sizes,
                                              int w,
                                              int h)
    {
        final double ASPECT_TOLERANCE = 0.1;
        double targetRatio = (double) w / h;
        if (sizes == null) return null;

        Camera.Size optimalSize = null;
        double minDiff = Double.MAX_VALUE;

        int targetHeight = h;

        // Try to find an size match aspect ratio and size
        for (Camera.Size size : sizes)
        {
            double ratio = (double) size.width / size.height;
            if (Math.abs(ratio - targetRatio) > ASPECT_TOLERANCE) continue;
            if (Math.abs(size.height - targetHeight) < minDiff) {
                optimalSize = size;
                minDiff = Math.abs(size.height - targetHeight);
            }
        }

        // Cannot find the one match the aspect ratio, ignore the requirement
        if (optimalSize == null)
        {
            minDiff = Double.MAX_VALUE;
            for (Camera.Size size : sizes)
            {
                if (Math.abs(size.height - targetHeight) < minDiff)
                {
                    optimalSize = size;
                    minDiff = Math.abs(size.height - targetHeight);
                }
            }
        }

        return optimalSize;
    }

    public void surfaceChanged(SurfaceHolder holder,
                               int format,
                               int width,
                               int height)
    {
        if(camera != null)
        {
            Camera.Parameters parameters = camera.getParameters();
            parameters.setPreviewSize(previewSize.width, previewSize.height);
            requestLayout();

            camera.setParameters(parameters);
            camera.startPreview();
        }
    }
}
===============================================================
//BroadcastManager

//MainActivity
public class MainActivity
    extends AppCompatActivity
{
    private static final String TAG = MainActivity.class.getName();
    private LocalBroadcastManager broadcastManager;
    private BroadcastMessages.TimerFiredReceiver timerFiredReceiver;

    @Override
    protected void onCreate(final Bundle savedInstanceState)
    {
        broadcastManager = LocalBroadcastManager.getInstance(this);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        timerFiredReceiver = new BroadcastMessages.TimerFiredReceiver()
        {
            @Override
            protected void doOnReceive(final Context context,
                                       final Intent intent)
            {
                Log.w(TAG, "timerFiredReceiver");
                BroadcastMessages.postStopTimerMessage(broadcastManager);
            }
        };

        BroadcastMessages.registerTimerFiredReceiver(timerFiredReceiver, broadcastManager);
        BroadcastMessages.postStartTimerMessage(broadcastManager, 1000);
    }
}

//BroadCastMesages
public class BroadcastMessages
{
    private static final String TAG                 = BroadcastMessages.class.getName();
    public static final String  START_TIMER_MESSAGE = "startTimer";
    public static final String  STOP_TIMER_MESSAGE  = "stopTimer";
    public static final String  TIMER_FIRED_MESSAGE = "timerFired";
    public static final String PERIOD_KEY = "period";

    private BroadcastMessages()
    {
    }

    private static void registerReceiver(final @NonNull String name,
                                         final @NonNull BroadcastReceiver receiver,
                                         final @NonNull LocalBroadcastManager broadcastManager)
    {
        final IntentFilter filter;

        Log.i(TAG,
              "registering " + name);
        filter = new IntentFilter(name);
        broadcastManager.registerReceiver(receiver,
                                          filter);
    }

    private static void post(final @NonNull String messageName,
                             final @NonNull LocalBroadcastManager broadcastManager)
    {
        final Intent intent;

        intent = new Intent();
        post(messageName, intent, broadcastManager);
    }

    private static void post(final @NonNull String messageName,
                             final @NonNull Intent intent,
                             final @NonNull LocalBroadcastManager broadcastManager)
    {
        final Bundle extras;

        extras = intent.getExtras();
        intent.setAction(messageName);

        if(extras == null)
        {
            Log.i(TAG,
                  "broadcasting " + messageName);
        }
        else
        {
            Log.i(TAG,
                  "broadcasting " + messageName + " " + extras.toString());
        }

        broadcastManager.sendBroadcast(intent);
    }
    private static abstract class AbstractReceiver
        extends BroadcastReceiver
    {
        private final String expectedAction;

        protected AbstractReceiver(final String action)
        {
            expectedAction = action;
        }

        @Override
        public final void onReceive(final Context context,
                                    final Intent intent)
        {
            final String action;

            action = intent.getAction();

            if(action.equals(expectedAction))
            {
                doOnReceive(context,
                            intent);
            }
            else
            {
                Log.w(TAG,
                      action +
                      " does not equal " + expectedAction);
            }
        }

        protected abstract void doOnReceive(Context context,
                                            Intent intent);
    }

    public abstract static class StartTimerReceiver
        extends AbstractReceiver
    {
        public StartTimerReceiver()
        {
            super(START_TIMER_MESSAGE);
        }
    }

    public abstract static class StopTimerReceiver
        extends AbstractReceiver
    {
        public StopTimerReceiver()
        {
            super(STOP_TIMER_MESSAGE);
        }
    }

    public abstract static class TimerFiredReceiver
        extends AbstractReceiver
    {
        public TimerFiredReceiver()
        {
            super(TIMER_FIRED_MESSAGE);
        }
    }

    public static void removeObserver(final @Nullable BroadcastReceiver receiver,
                                      final @NonNull LocalBroadcastManager broadcastManager)
    {
        if (receiver == null)
        {
            Log.w(TAG,
                  "typing to remove a null receiver");
        }
        else
        {
            Log.i(TAG,
                  "removing " + receiver.getClass().getName());
            broadcastManager.unregisterReceiver(receiver);
        }
    }

    public static void registerStartTimerReceiver(final @NonNull StartTimerReceiver receiver,
                                                  final @NonNull LocalBroadcastManager broadcastManager)
    {
        registerReceiver(START_TIMER_MESSAGE,
                         receiver,
                         broadcastManager);
    }

    public static void registerStopTimerReceiver(final @NonNull StopTimerReceiver receiver,
                                                 final @NonNull LocalBroadcastManager broadcastManager)
    {
        registerReceiver(STOP_TIMER_MESSAGE,
                         receiver,
                         broadcastManager);
    }

    public static void registerTimerFiredReceiver(final @NonNull TimerFiredReceiver receiver,
                                                  final @NonNull LocalBroadcastManager broadcastManager)
    {
        registerReceiver(TIMER_FIRED_MESSAGE,
                         receiver,
                         broadcastManager);
    }

    public static void postStartTimerMessage(final @NonNull LocalBroadcastManager broadcastManager,
                                             final long period)
    {
        final Intent intent;

        intent = new Intent();
        intent.putExtra(PERIOD_KEY,
                        period);
        post(START_TIMER_MESSAGE,
             intent,
             broadcastManager);
    }

    public static void postStopTimerMessage(final @NonNull LocalBroadcastManager broadcastManager)
    {
        post(STOP_TIMER_MESSAGE,
             broadcastManager);
    }

    public static void postTimerFiredMessage(final @NonNull LocalBroadcastManager broadcastManager)
    {
        post(TIMER_FIRED_MESSAGE,
             broadcastManager);
    }

    public static int getPeriod(final @NonNull Intent intent,
                                final int defaultValue)
    {
        final int period;

        period = intent.getIntExtra(PERIOD_KEY,
                                    defaultValue);

        return (period);
    }
}

//TimerApplication
public class TimerApplication
    extends Application
{
    private static final String TAG = TimerApplication.class.getName();
    private LocalBroadcastManager broadcastManager;
    private BroadcastMessages.StartTimerReceiver startTimerReceiver;
    private BroadcastMessages.StopTimerReceiver stopTimerReceiver;

    @Override
    public void onCreate() {
        super.onCreate();

        broadcastManager = LocalBroadcastManager.getInstance(this);
        startTimerReceiver = new BroadcastMessages.StartTimerReceiver()
        {
            @Override
            protected void doOnReceive(final Context context,
                                       final Intent intent)
            {
                //private Timer timer;

                Log.w(TAG, "startTimerReceiver");

                //timer = new Timer("fun");
                //timer.schedule(new TimerTask()...,0,1000); //1000 is param
            }
        };
        stopTimerReceiver = new BroadcastMessages.StopTimerReceiver()
        {
            @Override
            protected void doOnReceive(final Context context,
                                       final Intent intent)
            {
                Log.w(TAG, "stopTimerReceiver");
                //postStopTimerMessage()
            }
        };

        BroadcastMessages.registerStartTimerReceiver(startTimerReceiver,
                                                     broadcastManager);
        BroadcastMessages.registerStopTimerReceiver(stopTimerReceiver,
                                                    broadcastManager);
    }

    @Override
    public void onLowMemory()
    {
        super.onLowMemory();
    }

    @Override
    public void onTrimMemory(final int level)
    {
        super.onTrimMemory(level);
    }
}

===============================================================
//MathGame 

public class MainActivity extends AppCompatActivity {

    private Button      b1;
    private Button      b2;
    private Button      b3;
    private TextView    q;
    private int         ans;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        b1 = (Button) findViewById(R.id.answerButton1);
        b2 = (Button) findViewById(R.id.answerButton2);
        b3 = (Button) findViewById(R.id.answerButton3);
        q = (TextView) findViewById(R.id.questionField);

        ask();
    }

    public void btn1(final View view) {
        int bInt = Integer.parseInt(b1.getText().toString());
        if (bInt == ans) {
            ask();
        }
    }

    public void btn2(final View view) {
        int bInt = Integer.parseInt(b2.getText().toString());
        if (bInt == ans) {
            ask();
        }
    }

    public void btn3(final View view) {
        int bInt = Integer.parseInt(b3.getText().toString());
        if (bInt == ans) {
            ask();
        }
    }

    private void ask() {
        Random r = new Random();
        int i = r.nextInt(4);
        Log.d("@@@", Integer.toString(i));
        if(i == 0) {
            ans = addition();
        } else if (i == 1) {
            ans = subtraction();
        } else if (i == 2) {
            ans = product();
        } else if (i == 3) {
            ans = division();
        }
        randomBtn(ans);
    }

    private void randomBtn(int ans) {
        Random r = new Random();
        int location = r.nextInt(3);
        int a = r.nextInt(99999);
        int b = r.nextInt(99999);

        if(location == 0) {
            b1.setText(Integer.toString(ans));
            b2.setText(Integer.toString(a));
            b3.setText(Integer.toString(b));
        } else if (location == 1) {
            b1.setText(Integer.toString(a));
            b2.setText(Integer.toString(ans));
            b3.setText(Integer.toString(b));
        } else if (location == 2) {
            b1.setText(Integer.toString(a));
            b2.setText(Integer.toString(b));
            b3.setText(Integer.toString(ans));
        }
    }

    private int generateInt() {
        Random r = new Random();
        int result = r.nextInt(1001);
        return result;
    }

    private int addition() {
        int x = generateInt();
        int y = generateInt();

        String s = Integer.toString(x) + " + " + Integer.toString(y);
        q.setText(s);

        int result = x + y;
        return result;
    }

    private int subtraction() {
        int x = generateInt();
        int y = generateInt();

        if(x > y) {
            String s = Integer.toString(x) + " - " + Integer.toString(y);
            q.setText(s);
            int result = x - y;
            return result;
        }
        else if(x < y) {
            String s = Integer.toString(y) + " - " + Integer.toString(x);
            q.setText(s);
            int result = y - x;
            return result;
        }
        else {
            String s = Integer.toString(x) + " - " + Integer.toString(y);
            q.setText(s);
            int result = x - y;
            return result;
        }
    }

    private int product() {
        int x = generateInt();
        int y = generateInt();

        String s = Integer.toString(x) + " * " + Integer.toString(y);
        q.setText(s);
        int result = x * y;
        return result;
    }

    private int division() {
        int x = generateInt();
        int y = generateInt();

        while(x % y != 0 || y == 0) {
            x = generateInt();
            y = generateInt();
        }

        String s = Integer.toString(x) + " / " + Integer.toString(y);
        q.setText(s);
        int result = x / y;
        return result;
    }
}

===============================================================


===============================================================


===============================================================


===============================================================