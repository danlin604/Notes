=================================================================
@RESTFUL

Type name = (Type) Session["object"];

//How to add row into a table
//How to add trigger to db on events
//Look at Ch14CategoryMaint default.aspx
SqlDataSource1.InsertParameters["CategoryID"].DefaultValue = txtID.Text;
SqlDataSource1.Insert(); 


//Using dataset
DataSet ds = new DataSet("CutsomerDataSet");
SqlSataAdapter a = new Sql..


//get any restful services
public partial class ServerSide : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //configure web request object
        string url = "http://localhost:53417/api/categories/";
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
        request.Method = "GET";
        request.ContentType = "text/xml; encoding='utf-8'";

        //send request, get xml response and convert to stream
        WebResponse response = request.GetResponse();
        Stream stream = response.GetResponseStream();

        //read stream in to a dataset
        DataSet ds = new DataSet();
        ds.ReadXml(stream);

        //bind data set to gridview
        grdCategories.DataSource = ds.Tables[0];
        grdCategories.DataBind();
    }
}

=================================================================
@INSERT


string au_id = TextBox1.Text;
       string lname = TextBox2.Text;
       string fname = TextBox3.Text;
       string phone = TextBox4.Text;
       string address = TextBox5.Text;
       string city = TextBox6.Text;
       string state = TextBox7.Text;
       string zip = TextBox8.Text;
       string contract = TextBox9.Text;

       SqlDataSource1.InsertCommandType = SqlDataSourceCommandType.Text;
       string query =
           "INSERT INTO AUTHORS" + 
           "(" +
               "AU_ID," +
               "AU_LNAME," +
               "AU_FNAME," +
               "PHONE," +
               "ADDRESS," +
               "CITY," +
               "STATE," +
               "ZIP," +
               "CONTRACT" +
           ") " +
           "VALUES" +
           "(" + "'" +
               au_id + "'" + "," + "'" +
               lname + "'" + "," + "'" +
               fname + "'" + "," + "'" +
               phone + "'" + "," + "'" +
               address + "'" + "," + "'" +
               city + "'" + "," + "'" +
               state + "'" + "," + "'" +
               zip + "'" + "," +
               contract +
           ")";

       SqlDataSource1.InsertCommand = query;
       SqlDataSource1.Insert();

=================================================================
CategoryDB

        private string GetConnectionString()
        {
            //return @"Data Source=(LocalDB)\v11.0;Integrated Security=True;AttachDbFilename=c:\inetpub\wwwroot\Halloween.mdf";
            return @"user id=id;" +
                                       "password=pw;server=server;" +
                                       "database=Halloween; " +
                                       "connection timeout=30"; 
            
            //return ConfigurationManager
            //    .ConnectionStrings["Halloween"].ConnectionString;
        }

=================================================================

STUDENT_ID
FIRSTNAME
LASTNAME
EMAIL PK
PHONE_NUMBER
GENDER

protected void Button1_Click(object sender, EventArgs e)
    {
        string STUDENT_ID = TextBox1.Text;
        string FIRSTNAME = TextBox2.Text;
        string LASTNAME = TextBox3.Text;
        string EMAIL = TextBox4.Text;
        string PHONE_NUMBER = TextBox5.Text;
        //string GENDER = TextBox6.Text; //dropdown

        SqlDataSource1.InsertCommandType = SqlDataSourceCommandType.Text;
        string query =
            "INSERT INTO STUDENTS" + 
            "(" +
                "STUDENT_ID," +
                "FIRSTNAME," +
                "LASTNAME," +
                "EMAIL," +
                "PHONE_NUMBER," +
            ") " +
            "VALUES" +
            "(" + "'" +
                STUDENT_ID + "'" + "," + "'" +
                FIRSTNAME + "'" + "," + "'" +
                LASTNAME + "'" + "," + "'" +
                EMAIL + "'" + "," + "'" +
                PHONE_NUMBER +
            ")";

        SqlDataSource1.InsertCommand = query;
        SqlDataSource1.Insert();
    }



