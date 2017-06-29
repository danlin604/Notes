/* -------------------------------------------------------------- */
	Transact Structure Query Language TSQL
/* -------------------------------------------------------------- */

MS SQL Server 	- SQL\T-SQL
ORACLE 			- SQL\PL-SQL


/* -------------------------------------------------------------- */
	Exact Numeric Types
/* -------------------------------------------------------------- */

bigint		-9,223,372,036,854,775,808		9,223,372,036,854,775,807
int			-2,147,483,648					2,147,483,647
smallint	-32,768							32,767
tinyint		0								255
bit			0								1
decimal		-10^38 +1						10^38 –1
numeric		-10^38 +1						10^38 –1
money		-922,337,203,685,477.5808		+922,337,203,685,477.5807
smallmoney	-214,748.3648					+214,748.3647


/* -------------------------------------------------------------- */
	Approximate Numeric Types
/* -------------------------------------------------------------- */

Float		-1.79E + 308					1.79E + 308
Real		-3.40E + 38						3.40E + 38


/* -------------------------------------------------------------- */
	Date and Time Types
/* -------------------------------------------------------------- */

datetime 									Jan 1, 1753	Dec 31, 9999
(3.33 milliseconds accuracy)

smalldatetime								Jan 1, 1900	Jun 6, 2079
(1 minute accuracy)

date 										Jan 1, 0001	Dec 31, 9999
(1 day accuracy. Introduced in SQL Server 2008)

datetimeoffset 								Jan 1, 0001	Dec 31, 9999
(100 nanoseconds accuracy. Introduced in SQL Server 2008)

datetime2									Jan 1, 0001	Dec 31, 9999
(100 nanoseconds accuracy. Introduced in SQL Server 2008)

time 										00:00:00.0000000	23:59:59.9999
(100 nanoseconds accuracy. Introduced in SQL Server 2008)


/* -------------------------------------------------------------- */
	Character String
/* -------------------------------------------------------------- */

char

	Fixed-length non-Unicode character data with a maximum length of 8,000 characters.

varchar

	Variable-length non-Unicode data with a maximum of 8,000 characters.

Varchar (max)

	Variable-length non-Unicode data with a maximum length of 231 characters (Introduced in SQL Server 2005).
	
text

	Variable-length non-Unicode data with a maximum length of 2,147,483,647 characters


/* -------------------------------------------------------------- */
	Unicode Character Strings
/* -------------------------------------------------------------- */

nchar

	Fixed-length Unicode data with a maximum length of 4,000 characters.

nvarchar

	Variable-length Unicode data with a maximum length of 4,000 characters.

Nvarchar (max)

	Variable-length Unicode data with a maximum length of 230 characters (Introduced in SQL Server 2005).

ntext

	Variable-length Unicode data with a maximum length of 1,073,741,823 characters.


/* -------------------------------------------------------------- */
	Binary Strings
/* -------------------------------------------------------------- */

binary

	Fixed-length binary data with a maximum length of 8,000 bytes.

varbinary

	Variable-length binary data with a maximum length of 8,000 bytes.

varbinary(max)

	Variable-length binary data with a maximum length of 231 bytes (Introduced in SQL Server 2005).

image

	Variable-length binary data with a maximum length of 2,147,483,647 bytes.


/* -------------------------------------------------------------- */
	Other Data Types
/* -------------------------------------------------------------- */

sql_variant

	Stores values of various SQL Server-supported data types, except text, ntext,and timestamp.

timestamp

	Stores a database-wide unique number that gets updated every time a row gets updated.

uniqueidentifier

	Stores a globally unique identifier (GUID).

xml

	Stores XML data. You can store XML instances in a column or a variable (Introduced in SQL Server 2005).

cursor

	A reference to a cursor.

table

	Stores a result set for later processing.

hierarchyid

	A variable length, system data type used to represent position in a hierarchy (Introduced in SQL Server 2008).


/* -------------------------------------------------------------- */
	Create Tables
/* -------------------------------------------------------------- */

-- Syntax
CREATE TABLE table_name( 
   column1 datatype, 
   column2 datatype, 
   column3 datatype, 
   ..... 
   columnN datatype, 
   PRIMARY KEY( one or more columns ));


-- Example
CREATE TABLE CUSTOMERS( 
   ID   	INT              NOT NULL, 
   NAME 	VARCHAR (20)     NOT NULL, 
   AGE  	INT              NOT NULL, 
   ADDRESS  CHAR (25) , 
   SALARY   DECIMAL (18, 2),        
   PRIMARY KEY (ID));

-- Verify table is created
exec sp_columns CUSTOMERS


/* -------------------------------------------------------------- */
	Drop Tables
/* -------------------------------------------------------------- */

-- Syntax
DROP TABLE table_name;

-- Example
DROP TABLE CUSTOMERS;

-- Verify
Exec sp_columns CUSTOMERS;


/* -------------------------------------------------------------- */
	Insert Statement
/* -------------------------------------------------------------- */

-- Syntax
INSERT INTO TABLE_NAME [(column1, column2, column3,...columnN)]   
VALUES (value1, value2, value3,...valueN);

-- Syntax for all column insert
INSERT INTO TABLE_NAME VALUES (value1,value2,value3,...valueN);

-- Example
INSERT INTO CUSTOMERS (ID,NAME,AGE,ADDRESS,SALARY) 
VALUES (1, 'Ramesh', 32, 'Ahmedabad', 2000.00 );

INSERT INTO CUSTOMERS VALUES (7, 'Muffy', 24, 'Indore', 10000.00 );

-- Populate one table using another table
INSERT INTO first_table_name  
   SELECT column1, column2, ...columnN  
      FROM second_table_name 
      [WHERE condition];


/* -------------------------------------------------------------- */
	SELECT Statement
/* -------------------------------------------------------------- */

-- Syntax
SELECT column1, column2, columnN FROM table_name;

SELECT * FROM table_name;

-- Example
SELECT 
	ID, 
	NAME, 
	SALARY 
FROM CUSTOMERS; 


/* -------------------------------------------------------------- */
	UPDATE Statement
/* -------------------------------------------------------------- */

-- Syntax
UPDATE table_name 
SET column1 = value1, column2 = value2...., columnN = valueN 
WHERE [condition];

-- Example
UPDATE CUSTOMERS 
SET ADDRESS = 'Pune' 
WHERE ID = 6;

-- Update all
UPDATE CUSTOMERS 
SET ADDRESS = 'Pune', SALARY = 1000.00;


/* -------------------------------------------------------------- */
	DELETE Statement
/* -------------------------------------------------------------- */

-- Syntax
DELETE FROM table_name 
WHERE [condition];

-- Example
DELETE FROM CUSTOMERS 
WHERE ID = 6;

-- Delete all
DELETE FROM CUSTOMERS;


/* -------------------------------------------------------------- */
	WHERE Clause
/* -------------------------------------------------------------- */

-- Syntax
SELECT column1, column2, columnN  
FROM table_name 
WHERE [condition]

-- You can specify a condition using comparison or logical operators like >, <, =, LIKE, NOT, etc.

-- Example
SELECT ID, NAME, SALARY  
FROM CUSTOMERS 
WHERE SALARY > 2000;

SELECT ID, NAME, SALARY  
FROM CUSTOMERS 
WHERE NAME = 'Hardik';


/* -------------------------------------------------------------- */
	LIKE Clause
/* -------------------------------------------------------------- */

The MS SQL Server LIKE clause is used to compare a value to similar values using wildcard operators. There are two wildcards used in conjunction with the LIKE operator −

The percent sign (%)
The underscore (_)

-- Syntax
SELECT *\column-list FROM table_name 
WHERE column LIKE 'XXXX%' 

SELECT *\column-list FROM table_name 
WHERE column LIKE '%XXXX%'  

SELECT *\column-list FROM table_name 
WHERE column LIKE 'XXXX_'  

SELECT *\column-list FROM table_name 
WHERE column LIKE '_XXXX'  

SELECT  *\column-list FROM table_name 
WHERE column LIKE '_XXXX_'

-- Example
WHERE SALARY LIKE '200%'

	Finds any values that start with 200

WHERE SALARY LIKE '%200%'

	Finds any values that have 200 in any position
	
WHERE SALARY LIKE '_00%'

	Finds any values that have 00 in the second and third positions

WHERE SALARY LIKE '2_%_%'

	Finds any values that start with 2 and are at least 3 characters in length

WHERE SALARY LIKE '%2'

	Finds any values that end with 2

WHERE SALARY LIKE '_2%3'

	Finds any values that have a 2 in the second position and end with a 3

WHERE SALARY LIKE '2___3'

	Finds any values in a five-digit number that start with 2 and end with 3


/* -------------------------------------------------------------- */
	ORDER BY Clause
/* -------------------------------------------------------------- */

-- Syntax
SELECT column-list  
FROM table_name  
[WHERE condition]  
[ORDER BY column1, column2, .. columnN] [ASC | DESC];

-- Example
SELECT * 
FROM CUSTOMERS 
ORDER BY NAME, SALARY

SELECT * 
FROM CUSTOMERS 
ORDER BY NAME DESC


/* -------------------------------------------------------------- */
	GROUP BY Clause
/* -------------------------------------------------------------- */

-- Syntax
SELECT column1, column2 
FROM table_name 
WHERE [ conditions ] 
GROUP BY column1, column2 
ORDER BY column1, column2 

-- Example
SELECT 
	NAME, 
	SUM(SALARY) as [sum of salary] 
FROM CUSTOMERS 
GROUP BY NAME;


/* -------------------------------------------------------------- */
	DISTINCT Clause
/* -------------------------------------------------------------- */

Eliminate all the duplicate records and fetching only unique records.

-- Syntax
SELECT DISTINCT column1, column2,.....columnN  
FROM table_name 
WHERE [condition]

-- Example
SELECT DISTINCT SALARY 
FROM CUSTOMERS 
ORDER BY SALARY 


/* -------------------------------------------------------------- */
	Joining Tables
/* -------------------------------------------------------------- */

-- Example
SELECT 
	ID, 
	NAME, 
	AGE, 
	AMOUNT 
FROM 
	CUSTOMERS, 
	ORDERS 
WHERE  CUSTOMERS.ID = ORDERS.CUSTOMER_ID 

-- Alternative
SELECT 
	A.ID, 
	A.NAME, 
	A.AGE, 
	B.AMOUNT 
FROM 
	CUSTOMERS A INNER JOIN  ORDERS B ON A.ID = B.Customer_ID 


-- Types of joins
INNER JOIN
	
	Returns rows when there is a match in both tables.

LEFT JOIN

	Returns all rows from the left table, even if there are no matches in the right table.

RIGHT JOIN

	Returns all rows from the right table, even if there are no matches in the left table.

FULL JOIN

	Returns rows when there is a match in one of the tables.

SELF JOIN

	This is used to join a table to itself as if the table were two tables, temporarily renaming at least one table in the MS SQL Server statement.

CARTESIAN JOIN

	Returns the Cartesian product of the sets of records from the two or more joined tables.


/* -------------------------------------------------------------- */
	Sub-Queries
/* -------------------------------------------------------------- */

Sub-query or Inner query or Nested query is a query within another SQL Server query and embedded within the WHERE clause.

Sub queries can be used with the SELECT, INSERT, UPDATE, and DELETE statements along with the operators like =, <, >, >=, <=, IN, BETWEEN, etc.

There are a few rules that sub queries must follow

	You must enclose a subquery in parenthesis.

	A subquery must include a SELECT clause and a FROM clause.

	A subquery can include optional WHERE, GROUP BY, and HAVING clauses.

	A subquery cannot include COMPUTE or FOR BROWSE clauses.

	You can include an ORDER BY clause only when a TOP clause is included.

	You can nest sub queries up to 32 levels.


/* -------------------------------------------------------------- */
	Subqueries with SELECT Statement
/* -------------------------------------------------------------- */

-- Syntax
SELECT column_name [, column_name ] 
FROM   table1 [, table2 ] 
WHERE  column_name OPERATOR 
   (SELECT column_name [, column_name ] 
   FROM table1 [, table2 ] 
   [WHERE])

-- Example
SELECT *  
FROM CUSTOMERS
WHERE ID IN 
(
	SELECT 
		ID 
	FROM CUSTOMERS 
	WHERE SALARY > 4500
)


/* -------------------------------------------------------------- */
	Subqueries with INSERT Statement
/* -------------------------------------------------------------- */

-- Syntax
INSERT INTO table_name [ (column1 [, column2 ]) ] 
   SELECT [ *|column1 [, column2 ] 
   FROM table1 [, table2 ] 
   [ WHERE VALUE OPERATOR ]

-- Example
INSERT INTO CUSTOMERS_BKP 
SELECT * FROM CUSTOMERS  
WHERE ID IN (SELECT ID FROM CUSTOMERS)


/* -------------------------------------------------------------- */
	Subqueries with UPDATE Statement
/* -------------------------------------------------------------- */

-- Syntax
UPDATE table 
SET column_name = new_value 
[ WHERE OPERATOR [ VALUE ] 
   (SELECT COLUMN_NAME 
   FROM TABLE_NAME) 
   [ WHERE) ]

-- Example
UPDATE 
	CUSTOMERS 
SET 
	SALARY = SALARY * 0.25 
WHERE AGE IN 
(
	SELECT AGE 
	FROM CUSTOMERS_BKP 
	WHERE AGE >= 27 
)

/* -------------------------------------------------------------- */
	Subqueries with DELETE Statement
/* -------------------------------------------------------------- */

-- Syntax
DELETE FROM TABLE_NAME 
[ WHERE OPERATOR [ VALUE ] 
   (SELECT COLUMN_NAME 
   FROM TABLE_NAME) 
   [ WHERE) ]

-- Example
DELETE FROM CUSTOMERS 
WHERE AGE IN 
(
	SELECT AGE 
	FROM CUSTOMERS_BKP 
	WHERE AGE >=27 
)


/* -------------------------------------------------------------- */
	Stored Procedures (SP)
/* -------------------------------------------------------------- */

Stored procedure is used to save time to write code again and again by storing the same in database and also get the required output by passing parameters.

-- Syntax
Create procedure <procedure_Name> 
As 
Begin 
<SQL Statement> 
End 
Go

-- Example
CREATE PROCEDURE SelectCustomerstabledata 
AS 
SELECT * FROM Testdb.Customers 
GO


/* -------------------------------------------------------------- */
	Transactions
/* -------------------------------------------------------------- */

A transaction is a unit of work that is performed against a database. Transactions are units or sequences of work accomplished in a logical order, whether in a manual fashion by a user or automatically by some sort of a database program.


ACID

	Atomicity

		Ensures that all operations within the work unit are completed successfully; otherwise, the transaction is aborted at the point of failure, and previous operations are rolled back to their former state.

	Consistency

		Ensures that the database properly changes state upon a successfully committed transaction.

	Isolation

		Enables transactions to operate independently of and transparent to each other.

	Durability

		Ensures that the result or effect of a committed transaction persists in case of a system failure.


Transaction Control

	COMMIT

		To save the changes.

	ROLLBACK

		To roll back the changes.

	SAVEPOINT

		Creates points within groups of transactions in which to ROLLBACK.

	SET TRANSACTION

		Places a name on a transaction.

Transactional control commands are only used with the DML commands INSERT, UPDATE and DELETE only. They cannot be used while creating tables or dropping them because these operations are automatically committed in the database.

In order to use transactional control commands in MS SQL Server, we have to begin transaction with ‘begin tran’ or begin transaction command otherwise these commands will not work.


/* -------------------------------------------------------------- */
	COMMIT Command
/* -------------------------------------------------------------- */

The COMMIT command is the transactional command used to save changes invoked by a transaction to the database. This command saves all transactions to the database since the last COMMIT or ROLLBACK command.

-- Syntax
COMMIT;

-- Example
Begin Tran 
DELETE FROM CUSTOMERS 
   WHERE AGE = 25 
COMMIT 


/* -------------------------------------------------------------- */
	ROLLBACK Command
/* -------------------------------------------------------------- */

The ROLLBACK command is the transactional command used to undo transactions that have not already been saved to the database. This command can only be used to undo transactions since the last COMMIT or ROLLBACK command was issued.

-- Syntax
ROLLBACK

-- Example
Begin Tran 
DELETE FROM CUSTOMERS 
   WHERE AGE = 25; 
ROLLBACK


/* -------------------------------------------------------------- */
	SAVEPOINT Command
/* -------------------------------------------------------------- */

SAVEPOINT is a point in a transaction when you can roll the transaction back to a certain point without rolling back the entire transaction.

-- Syntax
SAVE TRANSACTION SAVEPOINT_NAME

-- Rollback to savepoint
ROLLBACK TO SAVEPOINT_NAME

-- Example
Begin Tran 
SAVE Transaction SP1 
-- Savepoint created. 
DELETE FROM CUSTOMERS WHERE ID = 1  
-- 1 row deleted. 
SAVE Transaction SP2 
-- Savepoint created. 
DELETE FROM CUSTOMERS WHERE ID = 2 
-- 1 row deleted.
SAVE Transaction SP3 
-- Savepoint created. 
DELETE FROM CUSTOMERS WHERE ID = 3 
-- 1 row deleted.

ROLLBACK Transaction SP2 
-- Rollback complete.


/* -------------------------------------------------------------- */
	SET TRANSACTION Command
/* -------------------------------------------------------------- */

SET TRANSACTION command can be used to initiate a database transaction. This command is used to specify characteristics for the transaction that follows.

-- Syntax
SET TRANSACTION ISOLATION LEVEL <Isolationlevel_name>


/* -------------------------------------------------------------- */
	Indexes
/* -------------------------------------------------------------- */

Indexes are special lookup tables that the database search engine can use to speed up data retrieval. Simply put, an index is a pointer to data in a table. An index in a database is very similar to an index at the end of a book.

An index helps speed up SELECT queries and WHERE clauses, but it slows down data input, with UPDATE and INSERT statements. Indexes can be created or dropped with no effect on the data.

Creating an index involves the CREATE INDEX statement, which allows you to name the index, to specify the table and which column or columns to index, and to indicate whether the index is in ascending or descending order.

Indexes can also be unique, similar to the UNIQUE constraint, in that the index prevents duplicate entries in the column or combination of columns on which theres an index.

-- Syntax
CREATE INDEX index_name ON table_name

-- Single column index
CREATE INDEX index_name 
ON table_name (column_name)

-- Example
CREATE INDEX singlecolumnindex 
ON customers (ID)


-- Unique index, no duplicates
CREATE UNIQUE INDEX index_name 
on table_name (column_name)

-- Example
CREATE UNIQUE INDEX uniqueindex 
on customers (NAME)


-- Composite indexes
CREATE INDEX index_name on table_name (column1, column2) 

-- Example
CREATE INDEX compositeindex 
on customers (NAME, ID)

 -- Whether to create a single-column index or a composite index, take into consideration the column(s) that you may use very frequently in a query's WHERE clause as filter conditions.

-- Should there be only one column used, a single-column index should be the choice. Should there be two or more columns that are frequently used in the WHERE clause as filters, the composite index would be the best choice.


-- Implicit Indexes

	Implicit indexes are indexes that are automatically created by the database server when an object is created. Indexes are automatically created for primary key constraints and unique constraints


-- Drop index
DROP INDEX tablename.index_name

	An index can be dropped using MS SQL SERVER DROP command. Care should be taken when dropping an index because performance may be slowed or improved.


-- When to avoid indexes

	Indexes should not be used on small tables.

	Tables that have frequent, large batch update or insert operations should not be indexed.

	Indexes should not be used on columns that contain a high number of NULL values.

	Columns that are frequently manipulated should not be indexed.


/* -------------------------------------------------------------- */
	Functions
/* -------------------------------------------------------------- */

COUNT

	The SQL Server COUNT aggregate function is used to count the number of rows in a database table.

MAX

	The SQL Server MAX aggregate function allows to select the highest (maximum) value for a certain column.

MIN

	The SQL Server MIN aggregate function allows to select the lowest (minimum) value for a certain column.

AVG

	The SQL Server AVG aggregate function selects the average value for certain table column.

SUM

	The SQL Server SUM aggregate function allows selecting the total for a numeric column.

SQRT

	This is used to generate a square root of a given number.

RAND

	This is used to generate a random number using SQL command.

CONCAT

	This is used to concatenate multiple parameters to a single parameter.

Numeric functions...

String functions...


/* -------------------------------------------------------------- */
	String functions
/* -------------------------------------------------------------- */

MS SQL Server String functions can be applied on string value or will return string value or numeric data.


ASCII()

	Ascii code value will come as output for a character expression.

	-- Example
	Select ASCII ('word') -- Returns ascii code value


CHAR()

	Character will come as output for given Ascii code or integer.

	-- Example
	Select CHAR(97) -- Returns a character for the gicen integer


NCHAR()

	Unicode character will come as output for a given integer.

	-- Example
	Select NCHAR(300) -- Returns unicode character for a given integer


CHARINDEX()

	Starting position for given search expression will come as output in a given string expression.

	-- Example
	Select CHARINDEX('G', 'KING') -- Return starting position of G


LEFT()

	Left part of the given string till the specified number of characters will come as output for a given string.

	-- Example
	Select LEFT('WORLD', 4) -- Return WORL


RIGHT()

	Right part of the given string till the specified number of characters will come as output for a given string.

	-- Example
	Select RIGHT('INDIA', 3) -- DIA


SUBSTRING()

	Part of a string based on the start position value and length value will come as output for a given string.

	-- Example
	Select SUBSTRING ('WORLD', 1,3) -- WOR
	Select SUBSTRING ('INDIA', 3,3) -- DIA
	Select SUBSTRING ('KING', 2,3)	-- ING


LEN()

	Number of characters will come as output for a given string expression.

	-- Example
	Select LEN('HELLO')


LOWER()

	Lowercase string will come as output for a given string data.

	-- Example
	Select LOWER('SQLServer') -- sqlserver


UPPER()

	Uppercase string will come as output for a given string data.

	-- Example
	Select UPPER('SqlServer') -- SQLSERVER


LTRIM()

	String expression will come as output for a given string data after removing leading blanks.

	-- Example
	Select LTRIM('   WORLD') -- 'WORLD'


RTRIM()

	String expression will come as output for a given string data after removing trailing blanks.

	-- Example
	Select RTRIM('INDIA   ') -- 'INDIA'


REPLACE()

	String expression will come as output for a given string data after replacing all occurrences of specified character with specified character.

	-- Example
	Select REPLACE('INDIA', 'I', 'K') -- 'KNDKA'


REPLICATE()

	Repeat string expression will come as output for a given string data with specified number of times.


	-- Example
	Select REPLICATE('WORLD', 2) -- 'WORLDWORLD'


REVERSE()

	Reverse string expression will come as output for a given string data.

	-- Example
	Select REVERSE('WORLD') -- 'DLROW'


SOUNDEX()

	Returns four-character (SOUNDEX) code to evaluate the similarity of two given strings.

	-- Example
	Select SOUNDEX('Smith'), SOUNDEX('Smyth') -- Return 'S530' for the 'Smith', 'Smyth' strings


DIFFERENCE()

	Integer value will come as output of given two expressions.

	-- Example
	Select Difference('Smith','Smyth') -- Return 4

	 If the output value is 0 it indicates weak or no similarity between give 2 expressions


SPACE()

	String will come as output with the specified number of spaces.

	Select 'I'+space(1)+'LOVE'+space(1)+'INDIA' -- 'I LOVE INDIA'


STUFF()

	String expression will come as output for a given string data after replacing from starting character till the specified length with specified character.

	Select STUFF('ABCDEFGH', 2,4,'IJK') -- 'AIJKFGH'


STR()

	Character data will come as output for the given numeric data.

	Select STR(187.369,6,2) -- 187.37


UNICODE()

	Integer value will come as output for the first character of given expression.

	The following query will give the 82 for the 'RAMA' expression.

	Select UNICODE('RAMA') 


QUOTENAME()

	Given string will come as output with the specified delimiter.

	The following query will give the "RAMA" for the given 'RAMA' string as we specified double quote as delimiter.

	Select QUOTENAME('RAMA','"') 


PATINDEX()

	Starting position of the first occurrence from the given expression as we specified 'I' position is required.


	The following query will give the 1 for the 'INDIA'.

	Select PATINDEX('I%','INDIA') 


FORMAT()

	Given expression will come as output with the specified format.

	The following query will give the ' Monday, November 16, 2015' for the getdate function as per specified format with 'D' refers weekday name.

	SELECT FORMAT ( getdate(), 'D') 

CONCAT()

	Single string will come as output after concatenating the given parameter values.

	The following query will give the 'A,B,C' for the given parameters.

	Select CONCAT('A',',','B',',','C') 


/* -------------------------------------------------------------- */
	Date Functions
/* -------------------------------------------------------------- */

GETDATE()

	It will return the current date along with time.

	GETDATE()

	The following query will return the current date along with time in MS SQL Server.

	Select getdate() as currentdatetime


DATEPART()

	It will return the part of date or time.

	DATEPART(datepart, datecolumnname)

	Example 1 − The following query will return the part of current date in MS SQL Server.

	Select datepart(day, getdate()) as currentdate

	Example 2 − The following query will return the part of current month in MS SQL Server.

	Select datepart(month, getdate()) as currentmonth


DATEADD()

	It will display the date and time by add or subtract date and time interval.

	DATEADD(datepart, number, datecolumnname)

	The following query will return the after 10 days date and time from the current date and time in MS SQL Server.

	Select dateadd(day, 10, getdate()) as after10daysdatetimefromcurrentdatetime 


DATEDIFF()

	It will display the date and time between two dates.

	DATEDIFF(datepart, startdate, enddate)

	The following query will return the difference of hours between 2015-11-16 and 2015-11-11 dates in MS SQL Server.

	Select datediff(hour, 2015-11-16, 2015-11-11) as differencehoursbetween20151116and20151111 


CONVERT()

	It will display the date and time in different formats.

	CONVERT(datatype, expression, style)

	The following queries will return the date and time in different format in MS SQL Server.

	SELECT CONVERT(VARCHAR(19),GETDATE())
	SELECT CONVERT(VARCHAR(10),GETDATE(),10)
	SELECT CONVERT(VARCHAR(10),GETDATE(),110)


/* -------------------------------------------------------------- */
	Numeric Functions
/* -------------------------------------------------------------- */

ABS()

	Absolute value will come as output for numeric expression.

	The following query will give the absolute value.

	Select ABS(-22) 


ACOS()

	Arc cosine value will come as output for the specified numeric expression.

	The following query will give the arc cosine value of 0.

	Select ACOS(0) 


ASIN()

	Arc sine value will come as output for the specified numeric expression.

	The following query will give the arc sine value of 0.

	Select ASIN(0)


ATAN()

	Arc tangent value will come as output for the specified numeric expression.

	The following query will give the arc tangent value of 0.

	Select ATAN(0) 


ATN2()

	Arc tangent value in all four quadrants will come as output for the specified numeric expression.

	The following query will give the arc tangent value in all four quadrants of 0.

	Select ATN2(0, -1) 


BETWEEN()

	If the values exist between given two expressions then those will be come as output.

	The following query will give the following output.

	SELECT salary from customers where salary between 2000 and 8500


MIN()

	Minimum value will come as output from the given expression.

	The following query will give '1500.00' for the given 'salary' expression from the customers table.

	Select MIN(salary)from CUSTOMERS


MAX()
	
	Maximum value will come as output from the given expression.

	The following query will give '10000.00' for the given 'salary' expression from the customers table.

	Select MAX(salary)from CUSTOMERS


SQRT()

	Square root of the given numeric expression will come as output.

	The following query will give 2 for the given 4 numeric expression.

	Select SQRT(4)


PI()

	PI value will come as output.

	The following query will give 3.14159265358979 for the PI value.

	Select PI() 


CEILING()

	Given value will come as output after rounding the decimals which is the next highest value.

	The following query will give 124 for the given 123.25 value.

	Select CEILING(123.25) 


FLOOR()
	
	Given value will come as output after rounding the decimals which is less than or equal to the expression.

	The following query will give 123 for the given 123.25 value.

	Select FLOOR(123.25) 


LOG()

	Natural logarithm of the given expression will come as output.

	The following query will give 0 for the given 1 value.

	Select LOG(1) 

/* -------------------------------------------------------------- */

/* -------------------------------------------------------------- */

SELECT [au_id], [au_fname] + ' ' + [au_lname] AS Name FROM [authors]


SELECT TITLE
FROM AUTHOR
	INNER JOIN TITLEAUTHOR
		ON @au_id = TITLEAUTHOR.AU_ID
	INNER JOIN TITLES 
		ON TITLEAUTHOR.AU_ID =  @au_id

SELECT TITLE
FROM AUTHOR
	INNER JOIN TITLEAUTHOR 
		ON TITLEAUTHOR.AU_ID = AUTHOR.AU_ID
	INNER JOIN TITLES
		ON TITLES.TITLE_ID = TITLEAUTHOR.TITLE_ID
WHERE
	AUTHOR.AU_ID = --AUTHOR ID VALUE 

/*
	Session

	Default1
	Before response Redirect
	Session.["infoToPassAlong"] = "Ben";
	
	Default2
	Drag a label
	Label1.Text = Session["infoToPassAlong"].ToString();
*/

CREATE PROCEDURE GET_AUTHOR_DETAIL
(
	@AU_ID VARCHAR(30)
)
AS
SELECT 
	AU_FNAME,
	AU_LNAME,
	PHONE,
	ADDRESS,
	CITY,
	STATE,
	ZIP
FROM AUTHORS 

===========================
--CREATE AUTHOR_BAK
CREATE TABLE AUTHORS_BAK
(
	AU_ID VARCHAR(11) NOT NULL,
	AU_LNAME VARCHAR(40) NOT NULL,
	AU_FNAME VARCHAR(20) NOT NULL,
	PHONE CHAR(12) NOT NULL,
	ADDRESS VARCHAR(40) NULL,
	CITY VARCHAR(20) NULL,
	STATE CHAR(2) NULL,
	ZIP CHAR(5) NULL,
	CONTRACT BIT NOT NULL,
	OPERATION CHAR(1)
)

--INSERT/POPULATE BACKUP
INSERT INTO AUTHORS_BAK
(
	AU_ID, 
	AU_LNAME, 
	AU_FNAME, 
	PHONE,
	ADDRESS,
	CITY,
	STATE,
	ZIP,
	CONTRACT
)
SELECT 
	AU_ID, 
	AU_LNAME, 
	AU_FNAME, 
	PHONE,
	ADDRESS,
	CITY,
	STATE,
	ZIP,
	CONTRACT
FROM AUTHORS

SELECT * INTO TITLEAUTHOR FROM TITLEAUTHOR_BAK
WHERE 1=2

ALTER TABLE TITLEAUTHOR_BAK
ADD OPERATION CHAR(1)

--CREATE TRIGGER FOR INSERT AUTHORS
CREATE TRIGGER TR_IN_AUTHORS
	ON AUTHORS
	FOR INSERT
AS
INSERT INTO AUTHORS_BAK
(
	AU_ID, 
	AU_LNAME, 
	AU_FNAME, 
	PHONE,
	ADDRESS,
	CITY,
	STATE,
	ZIP,
	CONTRACT
)
SELECT *
FROM INSERTED --TMP TABLE DURING TRIGGER
--AND UPDATE OPERATION
UPDATE AUTHORS_BAK
	SET OPERATION = 'I'
FROM AUTHORS_BAK
	INNER JOIN INSERTED
	ON AUTHORS_BAK.AU_ID = INSERTED.AU_ID

INSERT INTO AUTHORS
VALUES
(
	'111-11-1111', 
	'LTEST', 
	'FTEST', 
	'000 000-0000',
	'1234 TEST ADDRESS',
	'TESTCITY',
	'AA',
	'00000',
	1
)

===========================
--CREATE TRIGGER FOR DELETE AUTHORS
CREATE TRIGGER TR_DEL_AUTHORS
	ON AUTHORS
	INSTEAD OF DELETE
AS
--INSERT TO AUTHORS_BAK
INSERT INTO AUTHORS_BAK
(
	AU_ID, 
	AU_LNAME, 
	AU_FNAME, 
	PHONE,
	ADDRESS,
	CITY,
	STATE,
	ZIP,
	CONTRACT
)
SELECT *
FROM DELETED --TMP TABLE DURING TRIGGER

--UPDATE AUTHORS_BAK
UPDATE AUTHORS_BAK
	SET OPERATION = 'D'
FROM AUTHORS_BAK
	INNER JOIN DELETED
		ON AUTHORS_BAK.AU_ID = DELETED.AU_ID

--INSERT TO TITLEAUTHOR_BAK
INSERT INTO TITLEAUTHOR_BAK
(
	AU_ID,
	TITLE_ID,
	AU_ORD,
	ROYALTYPER
)
SELECT
	TITLEAUTHOR.AU_ID,
	TITLEAUTHOR.TITLE_ID,
	TITLEAUTHOR.AU_ORD,
	TITLEAUTHOR.ROYALTYPER
FROM TITLEAUTHOR
	INNER JOIN AUTHORS ON AUTHORS.AU_ID = TITLEAUTHOR.AU_ID
	INNER JOIN DELETED ON DELETED.AU_ID = TITLEAUTHOR.AU_ID

--UPDATE TITLEAUTHOR_BAK
UPDATE TITLEAUTHOR_BAK
	SET OPERATION = 'D'
FROM TITLEAUTHOR_BAK
	INNER JOIN DELETED
		ON DELETED.AU_ID = TITLEAUTHOR_BAK.AU_ID

--DELETE TITLEAUTHOR
DELETE FROM TITLEAUTHOR
WHERE
	TITLEAUTHOR.AU_ID = 
		(
			SELECT AU_ID
			FROM DELETED
		)

--DELETE AUTHORS
DELETE FROM AUTHORS
WHERE
	AUTHORS.AU_ID = 
		(
			SELECT AU_ID
			FROM DELETED
		)

===========================

INSERT INTO AUTHORS
(
	AU_ID, 
	AU_LNAME, 
	AU_FNAME, 
	PHONE,
	ADDRESS,
	CITY,
	STATE,
	ZIP,
	CONTRACT
)
VALUES
(
	au_id,
	lname,
	fname,
	phone,
	address,
	city,
	state,
	state,
	zip,
	contract
);

===========================

DELETE FROM AUTHORS
WHERE
	AUTHORS.AU_ID = ''

===========================

CREATE TABLE SALARY
(
	ID INT,
	EMPLOYEENAME VARCHAR(128),
	JOBTITLE VARCHAR(128),
	BASEPAY DECIMAL(18,8),
	OVERTIMEPAY DECIMAL(18,8),
	OTHERPAY DECIMAL(18,8),
	BENEFITS DECIMAL(18,8),
	TOTALPAYBENEFITS DECIMAL(18,8),
	YEAR INT,
	NOTES VARCHAR(128),
	AGENCY VARCHAR(128),
	STATUS VARCHAR(128)
)

===========================
SELECT DISTINCT
	JOBTITLE,
	AVG(TOTALPAYBENEFITS) AS TPB
FROM SALARIES
WHERE 
	YEAR = 2014
GROUP BY JOBTITLE
ORDER BY TPB DESC

SELECT
	EMPLOYEENAME,
	JOBTITLE,
	YEAR,
	AVG(TOTALPAYBENEFITS) AS TPB
FROM SALARIES
WHERE 
	--YEAR = 2014
	JOBTITLE LIKE '%Investment%'
GROUP BY JOBTITLE, EMPLOYEENAME, YEAR
ORDER BY TPB DESC



SELECT
	JOBTITLE,
	YEAR,
	AVG(TOTALPAYBENEFITS) AS TPB
FROM SALARIES
WHERE 
	YEAR = 2014
	AND 
	(
		JOBTITLE LIKE '%ACCOUNTANT INTERN%'
		OR JOBTITLE LIKE '%ASSISTANT RECRE%'
		OR JOBTITLE LIKE '%BEAUT%'
		OR JOBTITLE LIKE 'CLERK'
		OR JOBTITLE LIKE '%CRAFT%'
		OR JOBTITLE LIKE '%HOME HEALTH%'
		OR JOBTITLE LIKE '%MUSEUM G%'
		OR JOBTITLE LIKE 'MUSEUM P%'
		OR JOBTITLE LIKE 'RECREATION SP%'
		OR JOBTITLE LIKE '%CADET%'
	)
GROUP BY JOBTITLE, YEAR
ORDER BY TPB ASC

===========================
--CREATE TMP TABLE
CREATE TEMPORARY TABLE TMP
(
	DATE DECIMAL(14,4) NOT NULL,
	NAME VARCHAR(128) NULL,
	EMAIL VARCHAR(128) NULL
)

--INSERT ALL DATES
INSERT INTO TMP
(
	DATE
)	
SELECT DISTINCT WP_COL1
FROM WP_TABLE

--INSERT NAME
INSERT INTO TMP
(
	NAME
)
SELECT WP_COL3
FROM WP_TABLE
	INNER JOIN TMP ON TMP.DATE = WP_TABLE.WP_COL1
WHERE 
	WP_COL2 = 'USERNAME'

--INSERT EMAIL
INSERT INTO TMP
(
	EMAIL
)
SELECT WP_COL3
FROM WP_TABLE
	INNER JOIN TMP ON TMP.DATE = WP_TABLE.WP_COL1
WHERE 
	WP_COL2 = 'USEREMAIL'

--RETURNS TMP FINAL RESULT 
SELECT 
	DATE,
	NAME,
	EMAIL
FROM TMP 


===========================


INSERT INTO USER
(
  ID,
  EMAIL,
  PASSWORD
)
VALUES
(
  DEFAULT,
  'danlin604@gmail.com',
  '3900bcit'
)


===========================
--WARM UP

SELECT
	COUNT(DISTINCT ZIPCODE)
FROM ZIPCENSUS


SELECT DISTINCT
	LEFT(ZIPCODE, 3) AS SCF --FIRST 3 DIGITS
FROM ZIPCENSUS
ORDER BY SCF

--COUNT # OF ZIPCODE PER SCF
SELECT 
	LEFT(ZIPCODE, 3) AS SCF,
	COUNT(*)
FROM ZIPCENSUS
GROUP BY LEFT(ZIPCODE,3)
ORDER BY SCF

SELECT 
	STATE,
	COUNT(ZIPCODE) AS ZIPCODE
FROM ZIPCENSUS
GROUP BY STATE
ORDER BY STATE

SELECT 
	STATE,
	COUNT(DISTINCT LEFT(ZIPCODE,3)) AS SCF
FROM ZIPCENSUS
GROUP BY STATE
ORDER BY STATE

SELECT 
	ZIPCODE,
	POPULATION
FROM ZIPCENSUS
ORDER BY ZIPCODE

SELECT 
	DATE,
	HOLIDAYNAME,
	HOLIDAYTYPE
FROM CALENDAR
WHERE 
	HOLIDAYTYPE = 'NATIONAL'
	AND DATEPART(YEAR, DATE) = 2016 --GRABS DATE VALUE AND EXTRACT

SELECT 
	DATEPART(MONTH, DATE) AS MONTH, 
	COUNT(*) AS NUM_HOLIDAYS
FROM CALENDAR
WHERE 
	HOLIDAYTYPE = 'NATIONAL'
	AND DATEPART(YEAR, DATE) = 2016 --GRABS DATE VALUE AND EXTRACT
GROUP BY DATEPART(MONTH, DATE)

--CASE STATEMENTS
SELECT 
	MONTHNAME =
		CASE MONTH
			WHEN 1 THEN 'JANUARY'
			WHEN 2 THEN 'FEBRARY'
			...
			WHEN PRICE >= AND < 300 THEN 'HEYYY'
			ELSE 'YOOOO'
		END
FROM CALENDAR
WHERE 
	HOLIDAYTYPE = 'NATIONAL'
	AND DATEPART(YEAR, DATE) = 2016 --GRABS DATE VALUE AND EXTRACT
GROUP BY DATEPART(MONTH, DATE)

--FIND # OF POPULATION GREATER FOR EACH ZIPCODE
SELECT 
	Z1.STATE,
	Z1.ZIPCODE,
	COUNT(*)
FROM ZIPCENSUS Z1
	INNER JOIN ZIPCENSUS Z2 ON Z1.STATE =Z2.STATE
WHERE Z1.POPULATION < Z2.POPULATION
GROUP BY Z1.ZIPCODE, Z1.STATE
ORDER BY Z1.ZIPCODE


--COUNT FASTER

SELECT 
	Z1.STATE,
	SUM
	(
		CASE WHEN Z1.POPULATION < Z2.POPULATION
			THEN 1  --1 FOR SUMMING COUNT
		ELSE 0 END	--0 FOR SUMMING COUNT
	) AS NUMZIP
FROM ZIPCENSUS Z1
	INNER JOIN ZIPCENSUS Z2 ON Z1.STATE =Z2.STATE
WHERE Z1.POPULATION < Z2.POPULATION
GROUP BY Z1.ZIPCODE
ORDER BY Z1.ZIPCODE


--USING SUBQUERIES

SELECT
	SUM(...)
FROM
(
	SELECT 
		CASE WHEN...
		...
	FROM ZIPCENSUS ZC
) ZC

--NON CORRELATED SUBQUERY
	--INFO FROM INNNER TABLE
--CORRELATED
	--INFO FROM OUTSIDE TABLE



SELECT CUSTOMERID, P.PRODUCTID, P.NAME
FROM SALES.SALESORDERHEADER SH
	INNER JOIN SALES.SALESORDERDETAIL SD ON SD.SALESORDERID = SH.SALESORDERID 
	INNER JOIN PRODUCTION.PRODUCT P ON SD.PRODUCTID = P.PRODUCTID
ORDER BY CUSTOMERID


SELECT
	SH.CUSTOMERID,
    CustomColumn = STUFF((
            SELECT ', ' + REPLACE(P.NAME,',','')
				REPLACE(P.NAME,',','') AS PRODUCT
			FROM SALES.SALESORDERHEADER SH
				INNER JOIN SALES.SALESORDERDETAIL SD ON SD.SALESORDERID = SH.SALESORDERID 
				INNER JOIN PRODUCTION.PRODUCT P ON SD.PRODUCTID = P.PRODUCTID
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '')
FROM SALES.SALESORDERHEADER SH
	INNER JOIN SALES.SALESORDERDETAIL SD ON SD.SALESORDERID = SH.SALESORDERID 
	INNER JOIN PRODUCTION.PRODUCT P ON SD.PRODUCTID = P.PRODUCTID
ORDER BY SH.CUSTOMERID


SELECT
	SOD2.CUSTOMERID,
    CustomColumn = STUFF((
            SELECT ', ' + cpp2.Name
            FROM Production.Product cpp2
            JOIN Sales.SalesOrderDetail sod1
                ON sod1.ProductID = cpp2.ProductID
            WHERE sod1.SalesOrderID=sod2.SalesOrderID
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '')
FROM Sales.SalesOrderHeader sod2
JOIN Sales.Customer
    ON sod2.CustomerID = Customer.CustomerID
JOIN Person.Person
    ON Customer.PersonID = Person.BusinessEntityID
ORDER BY SOD2.CUSTOMERID



SELECT DISTINCT
    CUSTOMCOLUMN = STUFF((
            SELECT ', ' + REPLACE(P.NAME,',','')
			FROM SALES.SALESORDERHEADER SH1
				INNER JOIN SALES.SALESORDERDETAIL SD ON SD.SALESORDERID = SH1.SALESORDERID 
				INNER JOIN PRODUCTION.PRODUCT P ON SD.PRODUCTID = P.PRODUCTID
			WHERE SH2.CUSTOMERID = SH1.CUSTOMERID
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '')
FROM SALES.SALESORDERHEADER SH2



CREATE PROCEDURE SP_AUTHOR_PUBLISHER 
(
	@AUTHOR BIT,
	@FNAME	VARCHAR(30),
	@LNAME	VARCHAR(30)
)
AS 
	IF (@AUTHOR = 1)
	BEGIN
		SELECT *
		FROM AUTHORS
		WHERE
			AU_LNAME = @LNAME
			AND AU_FNAME = @FNAME
	END
	ELSE
		SELECT *
		FROM PUBLISHERS

CREATE TRIGGER TR_1
	ON ROYSCHED
	INSTEAD OF UPDATE
AS
DECLARE @MAX INT
SET @MAX =
(
	SELECT MAX(ROYALTY)
	FROM ROYSCHED
)
DECLARE @MIN INT
SET @MIN =
(
	SELECT MIN(ROYALTY)
	FROM ROYSCHED
)
UPDATE ROYSCHED
	SET ROYALTY = U.ROYALTY
FROM INSERTED U
	INNER JOIN ROYSCHED R ON R.TITLE_ID = U.TITLE_ID
WHERE 
	U.ROYALTY < @MAX
	AND U.ROYALTY > @MIN

===========================

/*
*	PATTERNS AND ANTI-PATTERNS IN SQL
*/

--JAYWALKING (ANTIPATTERN)
	Multivalue attribute storing '12,34' into ACCOUNT_ID

	legitimate use: If you need to store just a list.

	--PATTERN
		Create intersection / bridge table
		
--


DROP TABLE NS

CREATE TABLE NS (
	ID BIGINT IDENTITY PRIMARY KEY,
	NLEFT INTEGER NOT NULL,
	NRIGHT INTEGER NOT NULL,
	NAME VARCHAR(16) NOT NULL,
	TITLE VARCHAR(16) NOT NULL
);

-- make space for NS values 8 and 9
UPDATE NS
SET NLEFT = 
		CASE WHEN NLEFT >= 1
			THEN NLEFT+2
		ELSE NLEFT END,
	NRIGHT = NRIGHT+2
WHERE NRIGHT >= 1;
-- create new child of comment #5,
-- occupying NS values 8 and 9
INSERT INTO NS (NLEFT, NRIGHT, NAME, TITLE)
VALUES (1, 2, 'PETER', 'CIO');

UPDATE NS
SET NLEFT = 
		CASE WHEN NLEFT >= 2
			THEN NLEFT+2
		ELSE NLEFT END,
	NRIGHT = NRIGHT+2
WHERE NRIGHT >= 2;
-- create new child of comment #5,
-- occupying NS values 8 and 9
INSERT INTO NS (NLEFT, NRIGHT, NAME, TITLE)
VALUES (2, 3, 'JOHN', 'MANAGER');

UPDATE NS
SET NLEFT = 
		CASE WHEN NLEFT >= 4
			THEN NLEFT+2
		ELSE NLEFT END,
	NRIGHT = NRIGHT+2
WHERE NRIGHT >= 4;
-- create new child of comment #5,
-- occupying NS values 8 and 9
INSERT INTO NS (NLEFT, NRIGHT, NAME, TITLE)
VALUES (4, 5, 'AMANDA', 'MANAGER');


UPDATE NS
SET NLEFT = 
		CASE WHEN NLEFT >= 3
			THEN NLEFT+2
		ELSE NLEFT END,
	NRIGHT = NRIGHT+2
WHERE NRIGHT >= 3;
-- create new child of comment #5,
-- occupying NS values 8 and 9
INSERT INTO NS (NLEFT, NRIGHT, NAME, TITLE)
VALUES (3, 4, 'MARY', 'DESIGNER');

UPDATE NS
SET NLEFT = 
		CASE WHEN NLEFT >= 9
			THEN NLEFT+2
		ELSE NLEFT END,
	NRIGHT = NRIGHT+2
WHERE NRIGHT >= 9;
-- create new child of comment #5,
-- occupying NS values 8 and 9
INSERT INTO NS (NLEFT, NRIGHT, NAME, TITLE)
VALUES (7, 8, 'RALPH', 'DEVELOPER');

UPDATE NS
SET NLEFT = 
		CASE WHEN NLEFT >= 11
			THEN NLEFT+2
		ELSE NLEFT END,
	NRIGHT = NRIGHT+2
WHERE NRIGHT >= 11;
-- create new child of comment #5,
-- occupying NS values 8 and 9
INSERT INTO NS (NLEFT, NRIGHT, NAME, TITLE)
VALUES (9, 10, 'JEANNE', 'TESTER');

SELECT *
FROM NS



CREATE PROCEDURE SP_WAITLIST
(
	@EMAIL VARCHAR(128)
)
AS
SELECT 

FROM WAITLIST
WHERE
	NOTIFICATION_TIME =


CREATE PROCEDURE SP_WAITLIST()
BEGIN

	-- CHECK FOR EXPIRED
	UPDATE WAITLIST
		SET QUEUE = NULL, EXPIRED = 1
	WHERE
		NOTIFICATION_TIME = NULL
		AND (CURDATE() - 7) > NOTIFICATION_TIME
		
	--MOVE QUEUE
	UPDATE WAITLIST
		SET QUEUE = QUEUE - 1
	WHERE 
		QUEUE IS NOT NULL
		AND QUEUE <> 1

	--UPDATE NOTIFICATION_TIME
	UPDATE WAITLIST 
		SET NOTIFICATION_TIME = CURDATE()
	WHERE 
		QUEUE = 1
		
END





