COMP35120 C++

Albert Wei

SE1 109 Monday Midterm

===========================
Week 1
===========================

Who created C++? Bjarne Stroustrup

C++ is a multiparadigm language:
	Supports several paradigms
		Procedural
		Object Oriented
		Generic // called templates


hello, world
===========================
//hello.cpp
#include <iostream>

int main() {
	std::cout << "hello world" << std::endl;
}
===========================


cout is a pre-defined object by the library (of type ostream) associated with standard output

std = standard namespace
	a::output
	b::output
		same name, but different namespace

namespace defines the scope

everythingn in the standard c++ library is in the std namespace

<<  = output/insertion operator
:: = scope operator


/* */
//

In C++, int f(), is equal to int f(void);

In C++, main defaults to return 0.

===========================
#include <iostream>
int main() {
	using std::cout; //using declarations
	using std::endl;

	cout << "hello world" << endl;
	cout << "goodbye world" << endl;
}

===========================
#include <iostream>
using namespace std; //using directive

int main() {
	cout << "hello world" << endl;
}
===========================

Compiling
	g++ -std=c++11 -W -Wall -pedantic hello.cpp //c++ compiler associated to gcc
		// we are using c++ eleven

Some features of c++
	1 boolean type: bool true/false
		eg. bool b = true;
	2 references
		eg swapping integers
			//c
			int m = 1, n = 2;
			swap(&m, &n);
			void swap(int*p, int*q) {
				int tmp = *p;
				*p = *q;
				*q = tmp;
			}
			int m = 1, n = 2;
			swap(&m, &n);

			//c++
			int m = 1, n = 2;
			swap(m, n);
			void swap(int& a, int& b) {
				//&  = reference
				int tmp = a;
				a = b;
				b = tmp;
			}

	3 templates //generic programming
		class templates
		function templates // we can make a function generic

			template <typename T>
			void swap(T& a, T& b) {
				T tmp = a;
				a = b;
				b = tmp;
			}

			double d1 = 3.14, d2 = 2.71;
			swap(d1, d2);
			//compiler instantiate a version of swap with T = double

			float f = 2.7;
			swap(d1, f);
			// doesn't compile

	4 OOP
		eg a stack class

		#define CAPACITY 100
		class Stack {

		private:
			int data_ [CAPACITY]; //convention for private _
			size_t size_;

		public:
			Stack():size_(0){} //member initializer //precondition
			void push(int n) {data_[size_++] = n; }
			void pop() {--size_; }
			bool full() const{ return size_ == CAPACITY; } //const doesn't change object
			bool empty() const{ return size_ == 0; }
			int top() const{ return data_[size_ - 1];} //if 1 obj, it is at 0
		};



===========================
#include <iostream>
using namespace std;

template<typename T, size_t CAPACITY=10>

class Stack {
	private:
		T data_[CAPACITY];
		size_t size_;

	public:
		Stack(): size_(0){}   	// constructor should always member initializer. ALWAYS USE MEMBER INITIALIZER. see below.

		bool full() const { return size_ == CAPACITY; } // CONSTATNT METHOD

		bool empty() const { return size_ == 0;}

		int top() const { return data_[size_ -1];} //precondition: not empty

		void push(int n) { data_[size_++] = n;} // precondition: not full

		void pop() { --size_; } //precondition: not empty

		void print() const { // printing wont change the stack therefore its constant method
			cout << "[ ";
			for (size_t i = 0; i < size_; i++){
				cout << data_[i] << ' ';
			}
			cout << " ]";
		}

};

//constructors should always use member initializers, and not assignments


int main() {

	//Stack<int,15> s; //instantiate the class template with T=int and CAPACITY = 15
	//int i=0;

	Stack<double> s; //instantiate the class template with T=int and defaults the default CAPACITY of 10.
	int i=0;

	while(!s.full()){
		s.push(++i);
	}

	while(!s.empty()){
		cout << s.top() << endl;
		s.pop();
	}

}

g++ -std=c++11 -W -Wall -pedantic % //compile
./a.exe //execute

===========================

IO

Output
	3 predefined ostream objects used for output.
		classes called ostream, output stream, input stream
	cout = standard output

	// difference is in the buffering
	cerr = standard error
	clog = standard error

	eg.
		int n = 1, m = 2;
		cout << n << m << endl; // 12
			//<< = insertion operator, can keep on inserting
			// cout << n
				//returns cout
		//cout << n;  <--> cout operator << (n);
		//operator overloading
		//returns the original cout, not a copy
			//function reutns a reference, a int
		There is a method in the ostream class
		ostream& operator << (int)

	Stack s;
	cout << s;

	class Stack {
		public ostream& operator&(Stack); //??
	}

	operator << (cout, s); // not a method of the ostream class
	//cout.operator << (s);

	cout << x; // cout.operator<<(x)
				// operator<<(cout, x);

	cout << "hello"; <-> operator<<(cout, "hello");

	For Stack, we can implement
		ostream& operator<<(ostream&, const Stack&);
		//passing by reference is for efficieny reasons, stack size can be big
		//often we do not change the original, so it remains const

	//Note:
	ostream objects cannot be copied; they must be passed by reference and return by reference.


===========================

Output formatting

Objects have data member that determine how output performs

The ostream object has "format flags" that determines the output.
	You can manipulate these flags and print in ... eg hex, or 32 int.
	Turning bits on or off, you get different output formats.

The type of the "format flag" is ios_base::fmtflags
	//iosbase is a class
		//ostream inheriates from ios
	eg.
		ios_base::fmtflag f = cout.flags(); //retrieve flag
		... //manipulate formatting
		cout.flags(f); //reset flag

We can change the flags using either

	1 setf/unsetf methods //set a flag

	2 manipulator

setf/unsetf
Example

	1 show + sign
		int n = 123;
		cout.setf(ios_base::showpos);
		cout << n << endl; //+123
		cout.unsetf(ios_base::showpos);

	2 print in hex
		int n = 12;
		cout.setf(ios_base::hex, ios_base::basefield); //clears the group and sets hex
		cout << n << end; //c
		cout.setf(ios_base::dec, ios_base::basefield);
		cout << n << endl; //12

		//basefield = dec, hex, oct

Manipulators
Examples

	1
		int n = 123;
		cout << showpos << n << endl << noshowpos << n << endl; // +123
																// 123

	2
		int n = 12;
		cout << hex << n << endl //c
			<< dec << n << endl; //12

Some manipulators

	dec/oct/hex

	fixed/scientific // for floating point numbers

		eg.
			double d = 123.45678;
			cout << fixed << d << endl; //123.456780
				<< scientific << d << endl; //1.234568e+02

		default: general mode
			%g

		c++11: defaultfloat

	left/right/internal (adjustment)

		left = -123__
		right = __-123
		internal = -__123 //assume width of 6

		C: %6.3f
			6 width
			3 percision
			%6d

	showbase/noshowbase
		showbase = 0x12
		noshowbase = 12

	showpos/noshowpos
		showpos = +123
		noshowpos = 123

	uppercase/nouppercase
		uppercase = IF
		nouppercase = if

		1.234567E+02

	boolalpha/nocoolalpha
		boolalpha = false/true
		noboolalpha = 0/1

	setw/setpercision/setfill

		#include <iomanip>
		setw
			sets the width
			NOTE:  must be set everytime, the minimum field width reverts to 0 after each printing (formatted output)

		setpercision(6)

		setfill
			set the fill character

	eg.
		long double d = 123.45678;
		C
			printf("%08.3lf", d); //0123.457
		C++
			cout << setfill('0') << fixed << setw(8) << setprecision(3) << d;

How do manipulators work?

	cout << hex << n << endl;
		hex is a name of a function - function pointer

	hex(cout); //chnages format flag in cout to print in hexadecimal
	cout << n << endl;

In ios_base, there is a method

	ios_base& operator << (ios_base& (*pf) (ios_base&)) {
		pf(this); //pointer to the current object
		return *this;
	}

//hex is a function and it does the following...
ios_base& hex(ios_base& b) {
	b.setf(ios_base::hex, ios_base::basefield);
}

cout << hex ----->
cout.operator << (hex) ----->
hex(cout) ---->
cout.setf(...);


===========================

Input

cin
	predefined istream object associated with standard input.

example
	int m, n;
	cin >> m >> n;
		//cin >> n ---> return x cin
		//input/extraction operator

	typically skips leading white space.

	user input _123_456

How do we detect failure?

We can detect input failure by looking at the state of the istream object. //cin is an istream object
The state is represented by a member of type.
	//member = instance variable

//top of inheritance hierchy
	ios_base::iostate
		Possible values are...
			ios_base::goodbit
						defined to be 0
					  eofbit
					  failbit
					  badbit
					  //bits inside an int or char

		There are methods that test these bits...
			good(), eof(), fail(), bad() //oef = end of file
				//fail is exception... it tests failbit and badbit


		If an istream object is not in a good state, all input operations will fail.
			//if you try to read an int "hello", it will fail when read.
			//put input back in a good state by using clear method
			The clear() method is used to put an istream into a good state.

Example

	int n;
	cin >> n;
	// x = not set, 1 = set, @ = eof
	user input... 	fail bit... 	eof bit... 	n
	123 abc			x				x			123 //fail bit not set, eof not set
	123@			x				1			123
	abc				1				x			0 (c++11) //before c++11 n is unchanged
	@				1				1			0 (c++11)

Example
	Summing Integers obtained from user

int n, sum = 0;
while (1) {
	cout << "Enter an integer: ";
	cin >> n;
	if (cin.fail()) //call cin.clear() if necessary
					//only necessary if we try to read again
		break;
	sum += n;
}
cout << sum << endl;

user input: 123 456 abc 111 //in a file, fails at a

It turns out that an istream object as a truth value.
	cin can be put in an if statement. //converts to void*, if null pointer then it is false
cin is true if and only if it fail() returns false;

while(1) {
	cout << "Enter an integer: ";
	if (!(cin >> n)) // if we can't read n, then STOP
		break;
	sum += n;
}

This becomes very simple if we dont need to prompt the user:

	while (cin >> n) // as long we can read an integer, add it to the sum
		sum += n;

How to we continue by skipping the abc?

There is a method that discard characters:
	ignore() // discards at most 1 character, except eof
	ignore(128) // discards 128 characters
	ignore(128, '\n') // discards characters until a new line has been discarded or until at most 128 characters have been discarded.

	char word[128];
	cin >> word; //dangerious because word can be longer than 128
				 //may overflow buffer

	cin >> setw(128) >>word; //safe, assumes word has less than 128 characters

Interactive user input should be performed line by line.

Reading a line:

	char line[128];
	cin.getline(line,128);
		//problematic as it can fail in 2 ways:
			1 nothing is read
			2 input line has more than 128 characters
			//in both cases fail will return true

We should use the string class.
	c++ has a string class, and the string cna resize itself
		//eventually it can fail at around 2 billion characters

The string class...
					  // C            C++
	#include <string> //stdio.h ----> cstdio
					  //string.h ----> cstring
					  //ctype.h -----> cctype
	string s1, s2("hello"); // s1 = empty string


	s1 == s2, s1 != s2, s1 < s2, s1 <= s2, ... string comparisons

	string s("hello"), t("world");
	cout << s + " " + t << endl; //hello world
	s += t;
	cout << s << endl; //helloworld

	s.length() & s.size() both return the length of the string
		//container of characters = size
		//string = length

	s.max_size() returns the maximum possible character the string can store.

Reading a line:
	getline(stream, line, delim);
		//stream = istream&
		//line = string&
		//delimiter = char
		keeps extracting characters from the stream and storing them into line until either
			//whichever comes first
			1 eof is encountered // sets eofbit
			2. a character equal to the delimiter is extracted //delim is usually a new line characer
				//this character is discarded
			3 line.max_size() characters have been extracted // sets failbit

			If no character have been extracted, sets failbit.
				//immediately eof
				//sets failbit because we didn't read anything
				//if buffer is not big enough failbit will also be set
			return original stream

===========================
Week 2
===========================

//vvv code to test

#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main(){
	istringstream iss(" 12abc34 56");
	int n;

	if(iss >> n){
		cout << n << endl;	//12
	}

	if(iss>>n){
		cout << n << endl; //*no output*
	}

	string word;
	if(iss >> word){
		cout << word << endl; //*no output*
	}
	else {
		cout << "unable to read word" << endl;
	}

	iss.clear();

	if(iss>>word)
		cout << word << endl; //abc34

	if(iss>>n)
		cout << n << endl; //56

	iss.str("hello world"); 	//associate new string with iss

	if(iss >> word){
		cout << word << endl; //*no output, eof() is true*
	}

	iss.clear();

	if(iss>>word){
		cout<<word<<endl;
	}
}


#include <string>
#include <iostream>
using namespace std;

int main() {
	string s;
	cout << s.maxsize() << endl;
}

//this program is made to check the maxsize

we assume that case 3) [from prev lec] doesnt happen because it is a large number


Note: getline can be called with 2 arguments - it then reads a line.

Standard idiom to process standard input line by line...

	string line;
	while(getline(cin, line))
		/*process line*/



istringstream...

//example1

#include <sstream>
istringstream iss(" 12abc34 56");
int n;
if(iss >> n){
	cout << n << endl; //12
}

if(iss >> n){
	cout << n << endl;	//failed, no output
}

Be sure to call clear() to put the stream in a good state after failure!
Note: we can use the following to read a word...
	string word;
	cin >> word; //( BUT YOY HAVE TO TEST FOR SUCCESS OR FAILURE)


Example: summing integers obtained from user

int sum=0, n;
string line;

while(1){
	cout << "Enter an integer: ";
	if(!getline(cin, line)){
		clear();
		break;
	}
	istringstream iss(line);
	if(iss >> n)
		sum+=n;
}

cout << sum << endl;

#include <istream>

istringstream

eg
	istreingstream iss(" 12abc34 56");
	int n;
	if(iss >> n)//12
		cout << n << endl;
	if (iss >> n)
		cout << n << endl; //failed, no output

Be sure to call clear to put string in a good state after failure

We can use the following to read a word.
	string word;
	cin >> word (need to test for success /failture)

Example
	Summing int obtained from the user

int sum = 0, n;
string line;
while(1) {
	cout << "Enter on integer: ";
	if (!getline(cin, line)) {
		cin.clear();
		break;
	}
	istringstream iss(line);
	if(iss >> n)	//123abc hello... need to test more to make sure that fail happens
		sum += n;
}
cout << sum << endl;

input
	123abc hello //123

===========================

#include <iostream>
#include <string>
#include <sstring>

using namespace std;

int main() {
	istringstream iss(" 12abc34 56 ");
	int n;

	if (iss >> n)
		cout << n << endl; //12

	if (iss >> n)
		cout << n << endl; //no output, iss in fail state

	string word;
	if (iss >> word)
		cout << word << endl; // no output
			//if stream is not in a good state, any operations will fail
	else
		cout << "unable to read word" << endl;

	iss.clear(); //clear

	if (iss >> word)
		cout << word << endl; //abc34

	if (iss >> n)
		cout << n << endl; //56

	iss.str("hello world"; //associate new string with iss)

	if (iss >> word)
		cout << word << endl; // no out put, end of file is true

	iss.clear();

	if (iss >> word)
		cout << word << endl; //hello

	//always consider if string is in a good state
}


===========================

processing string character by character

s - string
for (string::size_type i = 0; i < s.size(); i++)
	/*process s[i]*/
	//return of size is a size_type, ot size_t

eg. Changing a string to all uppercase

void uppercase(string& s) {
	string::size_type i, sz=s.size();
	for(i=0; i<sz;i++)
		s[i]toupper(s[i]);
}

===========================

ostringstream

//allow us to print a string to a stream

#include <sstream>
int n = 123;
ostringstream oss;
oss << n << hex << n;
cout << oss.str() << endl;

By using an ostringstream we dont need to change the format flags of cout directly.
===========================

#include <iostream>
include <string>
#include <sstream>
using namespace std;

int main() {
	int n = 123;
	ostringstream = oss;

	oss << n << ' ' << hex << n;
	cout << oss.str() << ...


}


===========================

File I/O

#include <iostream>
#include <fstream>
using namespace std;

int main() {
	ifstream in("data");
	if (!in) {
		cerr << "unable to open file" << endl;
		return 1;
	}
	int n, sum = 0;

	while(in >> n)
		sum += n;

	cout << sum << endl;
}
//most of the time you don't need to close the file
c++ has a destructor that ususally executes when out of scope
file closes at end of main.


===========================

File I/O

#include <fstream> //ifstream, ofstream, fstream
	//ifstream = reading
	//ofstream = writing
	//fstream = reading & writing

Constructor opens the file //ctor
Destructor closes the file //dtor

eg.
	ifstream in("data"); //opens data for reading (in text mode)
	if(!in) { //if the open fails
		...
	}
	<<, >>, getline //use to read and write

How about binary mode?? //text mode vs binary mode
The ctor can take a second that specifies the openmode.
This open mode has type ios_base::openmode
Possible values are...
	ios_base::in
			  out
			  app //append
			  trunc //TRUNCATE, delete the content
			  binary
			  ate

	eg. Opening a file in binary in reading mode.

		ifstream in("data", ios_base::in | ios_base::binary);

Not all mode combinations are valid.
Some valid combinations...
	in 	out 	trunc 	app 	fopen-equivalent
	1							r
		1						w
		1		1				w
		1				1		a
						1		a
	1	1						r+
	1	1		1				w+
	1	1				1		a+

These can be combined with binary.

Example - Program to copy a file.

void copy(istream&, ostream&);

int main(int argc, char*argv[]) {
	if(argc != 3) {
		cerr << "usage: " << argv[0] << " [source][destination]" << endl;
		return 1;
	}
	ifstream in(argv[1]);
	if(!in) {
		cerr << "unable to open " << argv[1] << "'" << endl;
		return 2;
	}
	ofstream out(argv[2]);
	if(!out) {
		cerr << "unable to open '" << argv[2] << "'" << endl;
		return 3;
	}
	copy(in, out);
}

===========================
Copying character by character.

void copy(istream& is, ostream& os) {
	char c;
	while(is.get(c))
		os.put(c);
}

===========================
Copying line by line. //for text file, may be non-portable

void copy(istream& is, ostream& os) {
	string line;
	while(getline(is, line)) //getline does not get the new line character
		if(is.eof())
			os << line;
		else
			os << line << endl;
}

===========================
Copying block by block //array of characters

is.read(buffer, nbytes) //read at most nbytes from is and store them into buffer
						//sets failbit on EOF.

os.write(buffer, nbytes) //from the buffer we write to os that many bytes

is.gcount() //returns the number of bytes read by the last unformatted input.
	//returns type streamsize (some signed integral type)

	//Formatted input
	int n;
	cin >> n;

	//Unformatted inout
	deals with bytes

#define BUFSIZE 1024

void copy(istream& is, ostream& os) {
	char buf[BUFSIZE];
	streamsize nbytes;
	while(1) {
		is.read(buf, BUFSIZE);
		if((nbytes = is.gcount()) > 0)
			os.write(buf, nbytes);
		if(!is)
			break;
	}
}

===========================
Seeking within a file

Relative Seeking
	go back 5 bytes

Absolute seeking
	go to eof

2 forms of seeking... absolute and relative
Relative can be relative to the beginning, end or current position
Absolute seek back to a location or position that we remember by calling tellg/tellp.

Tellg/tellp
	tellg = get //position to read //get
	tellp = put //position to write //put

These 2 positions can be different in general. However for a physical file, they are the same.
	//ios::pos_type = return type of tellg and tellp.
	ios::pos_type pos = is.tellg();

ios::pos_type pos;
if((pos = is.tellg()) == ios::pos_type(-1)) { //tellg failed
	...
}

seekg/seekp

if(!is.seekg(pos)) { //seekg failed
	...
}

relative seeking

//type = off_type, seekdir
seekg(ios:off_type, ios_base::seekdir)

seekdir
	3 possible values
		ios_base::beg //relative to begining
				  cur //relative to current position
				  end //relative to end

eg.
	if(!is.seekg(ios::off_type(-5), ios_base::car)) { //seekg failed
		..
	}

//ios depends on the character type
//everything else depends on the ios_base

seekg (c++11) ... clears the eof-bit
	//before c++11 fails if eof bit is set

===========================

#include <iostream>
#include <sstring>
#include <string>
using namespace std;

int main() {
	stringstream ss("12abc45 67");

	int n;
	string word;

	//at the start both read and write positions are at the begining of the string
	if (ss >> n)
		cout << n << endl;
	else
		cout << "unable to read an int (1)" << endl;

	//read position is just after 12
	if (ss >> n)
		cout << n << endl;
	else
		cout << "unable to read an int (2)" << endl; //fails

	ss.clear();

	if(!(ss << "hello"))
		cout << "unable to write 'hello'" << endl; //overwrites 12abc


	if(ss >> word)
		cout << word << endl; //llo45
	else
		cout << "unable to read an word (3)" << endl;

	//read position is just after 45
	if(!ss.seekg(ios::off_type(-2), ios_base::cur))
		cout << "seekg fails (4)" << endl;

	if (ss >> n)
		cout << n << endl;
	else
		cout << "unable to read an int (5)" << endl;
}

//Note
For stringstream, the get & put position are independent.

//Miscellaneous Fact
int n;
c >> hex >> n; //reads hex, will accept a, b, etc

cin >> ws >> n; //ws discards whitespace

cin >> noskipws; //turn off skipping whitespace
cin >> skipws; //turn on skipping whitespace;

//I/O clauses

ios_base
	basic_ios<> //ios
		>>
		basic_istream<> // class template (istream)
			basic_ifstream<> //ifstream
			basic_istringstream<> //isstringstream
		<<
		basic_ostream<> // class template (ostream)
			basic_ostringstream<> //ostringstream
			basic_ofstream<> //ofstream

			<<, >>
			basic_iostream<> //iostream
				basic_fstream<> //fstring
				basic_stringstream //stringstream

References //pre-c++11
	A reference is just an alias //giving a vairaible another name
		and must be initialized when created
	Anything done to the reference is done to the referent (the object the reference refers to)

	eg.
		int n = 123;
		int& r = n;
		r = 456; //changes n to 456

		void inc(int& n) {
			++n;
		}
		inc(n); //457

	References makes pass by reference easy

	Restrictions on reference
		Arrays of references & pointers to references are not allowed
		However, you can create a reference to an array...
			eg.
				int a[100];
				int (&r)[100] = a; //left right rule

	References to constants & temporaries

		int& r = 1; //invalid

		const int& r2 = 1; //OK
			if you want to create a reference to a const you need const

		int m = 1, n = 2;
		int& r = m + n; //invalid, m+n  is a temporary
		const int& r2 = m+n; //OK ; this extends the lifetime of temporary.

	This turns out to be important.

	cout << (m+n); // ostream& operator << (int);
	string(s1("hello"), s2("world"));
	cout << (s1 + s2); //a temporary string

	ostream& operator << (ostream&, const string&) //without const we cannot print a temporary string object


===========================

Note. Do not return a reference to a local object from a function.

int& f() { //BAD: n is destroyed when f returns
	int n = 1;
	return n;
}

===========================
R value References (c++11)

eg.
	int m = 1, n = 2;
	int& r = m + n; // doesnt compile
	const int& r = m + n; //OK; ant use r to change the temporary object.
	r = 1; // doesnt compile

In C++11 we actually want to be able to change temporary objects.
WHY??
Reusing body parts.
Reusing the body parts for efficieny reasons.

Rather than copying a temporary, we want to reuse its components.

Copy VS Move semantics
lvalue VS rvalue
	rvalue =
		Anything that is not an lvalue is an rvalue.
	lvalue =
		Traditionally an lvalue is a value that can occur on the left side of an assignment.

		eg.
			int n;
			n = l; //n = lvalue
			1 = n; //invalud; 1 is not an lvalue
			int m = 2;
			n = m + n; //OK
			m + n = n; //invalid; m + n is not a lvalue

const int x = 1;
x = 2; //invalid

modificable lvalue VS non-modifiable lvalue
x is a non-modifiable value.

We can think of an lvalue as something that is addressable.

An rvalue reference can only bind to rvalues.

	//rvalue refernce
	int m = 1, n = 2;
	int&& r r = m; //invalid; m is an lvalue
	int&& r = m + n; //OK

The name of an rvalue reference is itself an lvalue.

int&& r = m + n; //rvalue reference
r = 1; //OK, r is an lvalue

This allows us to modify the temporary object.
//c = some class
1. void f(c&); //can only bind to lvalues
2. void f(const c&); //This can bind to both lvalues & rvalues
3. void f(c&&); //can only bind to rvalues

C c;
f(c); //which f is called?

const C c2;
f(c2); //calls 2.
f(c + c2); //calls 3.; if 3 doesnt exist, calls 2



Copy VS Move

class C {
	class C {
		public:
			C(); //default ctor
			C(const C&); //copy ctor; by reference
			C(C&&); //move ctor
			C& operator = (const C&); //copy assignment
			C& opperator = (C&&); //move assignment
	}
};

Example : A String class
	String s("hello"), s2("goodbye"); //s doesn't store hello, s stores reference
									  // hello\0 is stored elsewhere
	String s3(s);
		1. allocate memor, large enough to store hello
		2. copy "hello"

	copy ctor...
		class String {
			private:
				char*s_;
			public:
				String(const String&);
				...
		}

		String (const String& src)
		: s_(new char_[strlen(src.s_)+1]) {
			strcpy(s_, src.s_);
		}

		string (string&& src)
		: s_ (src.s_) { //may be more efficient as we do not need to allocate memory to copy the string.
			src.s_ = nullptr;
		}

string s3(s1 + s2);

void f(C c); //pass-by-value : can call either copy ctor or move ctor (move ctor is for rvalues)

C c1;
f(c1); //calls copy ctor
C c2;
f(c1 + c2); //calls move ctor

===========================
Week 3
===========================

lvalue reference VS rvalue reference

	int m = 1, n = 2;
	int&& r = m+ n; //this extends the lifetime of the tempory

std::move

	class C {
	public:
		C(const C&);
		C(C&&);
		...
	};

	void f(C c);

	Does it call the copy ctor or the move ctor?

	C c;
	f(c); //calls the copy ctor
	f(std::move(c)); //calls move ctor; we should not use c after moving

		If we know that we will not use c after this, more efficient to move than copy

	std::move can be thought of as a CAST; it casts argument to an rvalue

eg. swap
	//copy
	template<typename T>
	void swap(T& a, T& b) {
		T tmp = a;
		a = b;
		b = tmp;
	}

	//more efficient
	template<typename T>
	void swap(T& a, T& b) {
		T tmp = std::move(a); //calls move ctor
		a = std::move(b); //calls move assignment
		b = std::move(tmp); //calls move assignment
	}

===========================
Dynamic Memory

	C: malloc/free
	C++: new/delete

eg.

	int *p = new int[100]; //dynamically allocate an array of 100 int
	int *q = new int; //dynamically allocate 1 int
	int *r = new int(5); //initialize the int to 5

	delete q;
	delete r;
	delete [] p; //must call this version if we call new with []

How do we deal with failure?

	try {
		char *p = new char[10000000000];
		...
	}
	catch (const bad_alloc& e) { //don't make a copy of the exception; catch by reference
		cerr << e.what() << endl;
	}

Difference between malloc and new?

	new calls ctors, malloc does not

	delete calls dtor, dree does not

eg.

	class C {
	public:
		C();
		C(const C&);
		~C(); //dtor
		...
	}

	C *p = new C[10]; //calls default ctor 10 times

	C *q = new C(p[0]); //calls copy ctor

	delete q; //calls dtor

	delete [] p; //calls the dtor 10 times

===========================
Default Arguments

	We are allowed to specify default values for the parameters of functions when we are declaring it.

eg. volume cuboid

	double volume(double l = 1, double w = 1, double h = 1); //prototype

	double volume(double l, double w, double h) { //default argument NOT repeated
		return l * w * h;
	}

	cout << volume() << endl; //same as volume(1,1,1)
	cout << volume(3) << endl; //(3,1,1)
	cout << volume (3, 4) << endl; //(3,4,1)
	cout << volume(3,4,5) << endl;

Restrictions:

	volume ( , 4, ) doesnt compile

	When declaring a function, if a parameter has a default value, all LATER parameter must have default values.

eg.

	void f(int, int = 1, int); //invalid
	void g(int, int=1, int=2); //OK

When calling a function, if a parameter has an argument, all EARLIER parameters must have arguments.

Default arguments go with prototypes. If we are not using prototypes, we can put the default arguments with the function definition.

===========================
Inline Functions

	A function definition can be declared "inline". This asks the compiler to "in line" expand calls to this function.
		//push argument argument for the function to the top of stack
		//function directly in code where you need it

eg.

	inline double square(double d) {
		return d * d;
	}

	cout << square(n) << endl;
		//expand square(n) to n*n; more efficient

When should you use inline?

	In classes in small function.

===========================

Default Arguments

	Note: The default value for a parameter can be a call to another function.

	void f(int, int = 1, int = g()) //function that returns an int

	f(2); //compiler rewrites this to f(2, 1, g(1));

Inline Functions

	For optimization. Asks the compiler not to generate code to the function.
	A function definition can be declared as inline.

	inline double squar(double d) {
		return d*d;
	}

	cout << square(123) << endl;
		//square(123) compiler can expand this cal to 123*123
		Then we dont need & jump to the square function

Inline is a request, it is up to the compiler. It may or may not inline.
//Ususally we inline for small functions.

Inline MAY lead to more efficient code, but the program may become bigger.

Methods defined in a class definition are implicitly inline.

===========================

Class Declaration VS Class Definition VS Class Implementation

	.h files //definition
	.cpp //implementation

Break circle of dependency between C and D

	Class D; //class eclaration

	class C {
		D *p; //pointer to a D
	};

	class D {
		C c; //size of c is unknown
	};

	int main() {
		return 0;
	}


stack.h (header file)

	#include <cstddef>

	class Stack { //class definition
	private:
		static const size_t CAPACITY = 100;
		int data_[CAPACITY];
		size_t size_;
	public:
		Stack();
		bool full() const { return size_ == CAPACITY; } //implicitly inline
		bool empty() const { return size_ == 0; } //implicitly inline
		int top() const;
		void pop();
		void push(int n);
	};

	inline int //important to declare this inline:
			   //functions defined in header files should be inline
	Stack::top() const { //the Stack:: tells the compiler that top is a mmeber of Stack
		return data_[size_-1];
	}

stack.cpp file
//class implementation
#include "stack.h"

Stack::Stack(): size_0 {}

void
Stack::pop() { --size_; }

void
Stack::push(int n) { data_[size_++] = n; }

//
main.cpp

#include <iostream>
#include "stack.h"
using namespace std;

int main() {
	Stack s;

	s.push(1);
	s.push(2);
	s.push(3);
	while(!s.empty()) {
		cout << s.top() << end;
	}

}

===========================

Function Overloading

	The phenomenon of having multiple functions with the same name & in the same scope but with different parameter lists.

Example

	void f(int);
	void d(double);

	void f2(int);
	void f2(int, int);

	void f3(int);
	void f3(int&);

	void f4(int&);
	void f4(const int&);

	void f5(int);
	void f5(int=1); //not function overloading; regarded as a redeclaration of f5

	void f6(int = 1);
	void f6(int = 2); //error

	void f7(int);
	int f7(int); //error

	function matching (function overload resolution) //process of determining which among a set of overloaded functions is actually evoked by a particular function call.

	eg.
		f(2); //which function is going to be used

		No match
		Best match
		Ambiguous //2 or more are equally as good

3 possible outcomes of function matching

	1. There is a best match
	2. There are multiple matches but no best match: we say the call is ambiguous
	3. There are no matches

Example

	int max(int, int); //1
	double max(double, double); //2
	int max(const int[], size_t); //3
	struct Math {
		static int mac(int, int); //4
	};
	int main() {
		cout << max(1, 2.3) << endl; //which max is called?
	}

Steps in function Matching

	1. Find candidate functions (trivial step): candidate functions are those that have the same name as that in the function call & that are in scope.
		//In out example, only 1, 2, and 3 are candidates.
	2. From candidate functions, find the viable functions: viable functions are those that can actually be evoked with the arguments in the function call we are considering. This may be due to the existence of conversions.
		//In our example, only 1 and 2 are viable.
	3. Rank the viable function,: we rank each conversions needed for each argument in order to call the viable function.
		Conversions are ranked from best to worst as follows:
			1. exact match
				for references & pointers, we have 2 sublevels:
					//c & c++ have cv (const volatile) qualifiers
					-without qualification conversions
					-with qualification conversion

eg.
	void f(int&); //1
	void f(const int&); //2
	int n=1;
	f(n); //calls 1; doesn't require a qualification conversion


			2. Promotion
				Only 2 promotions:
					float -> double
					smaller integer type -> int

			3. Standard conversion: any conversion besides exact match or promotion & user-defined conversion

			4. User defined conversion: conversion from 1 class to another defined by us.

		4. Determine the best match (if it exists) from the rankings of the conversions.

			The viable function is best if

			1. No other viable function has a better conversion than the corrosponding conversion needed to call the best function, &
			2. For any other viable function, the best function must have at least 1 conversion that is better than the corrosponding conversion to call that other viable function.
Example

	max(1, 2.3);
	int max(int, int); //exact match, standard conversion
	double max(double, double); //standard conversion, exact match
	//call is ambiguous

	void f(int n); //promotion
	void f(float n); //stand. conversion
	short s = 1;
	f(s); //calls f(int n)

	void g(int& n); //1
	void g(float n); //2
	short s = 1;
	g(s); //calls 2; 1 is not viable because we cannot create a temporary unless there reference is to a const type

	void h(const int& n); //1, promotion
	void h(float n); //2
	short s = 1;
	h(s); //calls 1

===========================
#include <iostream>
using namespace std;

#define FUNC(NAME,TYPE) void NAME(TYPE X) { cout << #NAME "(" #TYPE ")"" << endl;}

FUNC(f, int&)
FUNC(f, float)

int main() {
	short s = 1;
	f(s);
}

===========================

//onshare out

//notes for shareout
list<int>::size_type
vector<int>::size_type

string::size_type i, sz = s.size();
for (i=0;i<sz;i++)
	//process s[i]

Functional programming
	//Nothing ever changes

string::npos //max possible value
	static const size_type npos = -1; //unsigned type; -1 means max value

string s("hello");
if(s=="world") //OK; automatically converted to string object and comparison will perform

c_str() //returns a c style string; a pointer


string s("123");
int n=atoi(s.cstr());

to_string //not yet in c++11
istringstream //use to convert to string

int top() const
	//constant method for string...
	s.size() //doesn't change string

	s+=s2;
		s.append(...); //not constant

s.top()

const char&
	operator[](size_type pos) const; //1
char&
	operator[](size_type pos); //2

string s("hello");
s[0] = 'H'; //2
cout << s[0] << endl; //2
const string s2("world"); //almost everywhere
cout << s2[0] << endl; //1
s2[0] = 'H'; //doesnt compile; cant assign to constant char reference

void f(const string& s) {
	for (...)
		s[i] //calls 1
}

===========================
string.cpp

#include <iostream>
#include <string>
#include <cctype>
using namespace std;

//"remove" leading whitespace
string ltrim(const string& s) {
	string::size_type i, sz = s.size();
	for (i = 0; i < sz; i++)
		if(!isspace(s[i]))
			break;
	return s.substring(i);
}

void ltrim2(string& s) {
	string::size_type i, sz = s.size();
	for (i = 0; i < sz; i++)
		if(!isspace(s[i]))
			break;
	s = s.substring(i); //cheats; assigns back
}

int main() {
	string s("   hello");
	ltrim2(s);


	cout << ltrim("     ") << '|' << endl;
	cout << ltrim("     hello world    "); << '|' << endl;
}

===========================
Week 4
===========================

The string class
• an instantiation of a class template:
typedef basic string<char> string;
• declared in the header file string
• for “old” C-style strings, use the header file cstring
• a string can contain any character; ’\0’ is not a special
character
• >> and << can be used for input & output
string s; // default ctor; empty string
if (cin >> s) // read next word; skip leading whitespace
cout << s;
• the getline function can also be used to input into a string
string s;
while (getline(cin, s)) {
// for each line read (’\n’ is thrown away)
}
while (getline(cin, s, ’:’)) {
// for each token read
// tokens are separated by ’:’ (’:’ is thrown away)
// token may contain ’\n’
}
• several constructors
1
string s1, // empty string
s2(10, ’a’), // string of 10 a’s
s3("hello"), // contains ’h’,’e’,’l’,’l’,’o’
s4("hello!", 4),// ’h’,’e’,’l’,’l’ (1st 4 chars)
s5(s3, 3), // ’l’,’o’ (start from pos 3)
s6(s3, 1, 2), // ’e’,’l’ (2 chars, from pos 1)
s7(s3); // copy of s3
Note: some string functions take arguments that specify a
starting position & the number of chars (e.g. s6 above);
these arguments have type string::size type which is an
unsigned integral type
For “number of chars”, the special value string::npos can
usually be used to specify all remaining chars
Example: string s8(s3,3,string::npos) would give the same
string as s5 above
string::npos is defined as:
static const size type npos = -1; /* ?? */
• automatic conversion from const char * into strings, but no
automatic conversion in the other direction
• use the member function c str() to return the content as a
“constant” C-string (const char *)
Note: the returned pointer is valid only until the next call
to a nonconstant member function for the same string
string s("123");
int n = atoi(s.c_str());
• the length of a string is returned by the length() & size()
member functions
2
• max size() returns the max number of characters a string
may hold
• capacity() returns the total number of chars a string can
hold in the memory it has been allocated; reserve(size type)
may be used to change the capacity
• resize() can be used to resize a string
string s("hello");
s.resize(4);
cout << s; // hell
string s2("hello");
s2.resize(7);
cout << s2; // hello + 2 null chars
// (null char is not special)
string s3("hello");
s3.resize(7, ’o’);
cout << s3; // hellooo
• to check for an empty string, use the empty() member function
• can combine strings with C-strings in many situations (comparing, appending, inserting, etc)
• assignment operator (=): the new value can be given as a
string, a C-string or a single char
• comparison operators: == != < > <= >=
3
• concatenation (+) & appending (+=)
string s, s1("hello"), s2("world");
s = s1 + " " + s2;
cout << s << endl; // hello world
s1 += ’!’;
cout << s1 << endl; // hello!
• element access: use [] operator or at() member function
const_reference operator[](size_type pos) const;
reference operator[](size_type pos);
const_reference at(size_type pos) const;
reference at(size_type pos);
– [] does not check that position used is valid; at() does
(it throws out of range exception if invalid)
– for the constant version of []; the position after the last
char is valid (it returns ’\0’)
– for other cases, the actual number of chars is an invalid
index
– the nonconstant versions of [] & at() return a character
reference which becomes invalid on reallocation
string s("hello");
char &p = s[0];
char *q = &s[1];
p = ’H’; // s contains ’H’,’e’,’l’,’l’,’o’
*q = ’E’; // s contains ’H’,’E’,’l’,’l’,’o’
s += " world"; // may invalidate p & q
p = ’h’; // may lead to undefined behaviour
4
• use the substr() member function to extract a substring
string s("goodbye");
s.substr(); // returns a copy of s
s.substr(4); // returns string("bye")
// (from position 4)
s.substr(4,2); // returns string("by")
// (2 chars from position 4)
s.substr(4,10); // same result as s.substr(4)
note that the first argument pos must satisfy pos <= size();
otherwise, an out of range exception is thrown
• can use the append(), insert(), replace() & erase() member
functions to modify a string
string s, s1("hello"), s2("world");
s1.append(s2); // s1:helloworld
s1.insert(5," cruel "); // s1:hello cruel world
s1.replace(6,5,"wonderful");// s1:hello wonderful world
s1.erase(6,9); // s1:hello world
// (9 chars from pos 6)
s1.erase(5); // s1:hello
s1.insert(1, 3, ’e’); // s1:heeeello
s2.replace(1,string::npos,s1,4,3); // s2:well
these functions return the modified string
string s("hi");
cout << s.append("ll") << endl; // hill
cout << s << endl; // hill
5
• there are a number of search functions:
– find() & rfind(), find first of() & find last of(),
find first not of() & find last not of()
– each has several versions; for example
// start looking from position pos
size_type find(const string& str, size_type pos = 0) const;
// start from position pos, compare with first n chars in s
size_type find(const char* s, size_type pos, size_type n) const;
size_type find(const char* s, size_type pos = 0) const;
size_type find(char c, size_type pos = 0) const;
Note: if pos >= size(), the search fails & returns string::npos
Examples
string s("okeley-dokeley");
cout << s.find("ley") << endl; // 3
cout << s.rfind("ley") << endl; // 11
cout << s.find_first_of("key") << endl; // 1
cout << s.find_last_of("key") << endl; // 13
– they return string::npos (of type string::size type) if
the string/character is not found:
string::size_type idx;
idx = s.find("hello"); // assume we have a string s
if (idx == string::npos)
cout << "’hello’ not found!" << endl;
• note that a string object is basically a container of chars, so
some of the concepts of STL containers that we’ll discuss
later (such as iterators) are applicable
6
Example:
// Program name: replace
// Purpose: to replace all occurrences of a specified
// string by another in a file
// - the old & new strings are specified on the commandline
// - use I/O redirection to read from & write to files
// Example: replace oldstring newstring < infile > outfile
#include <iostream>
#include <string>
using namespace std;
int main(int argc, char *argv[]) {
if (argc != 3) {
cerr << "usage: replace <old string> <new string>\n";
return 0;
}
string s, os(argv[1]), ns(argv[2]);
string::size_type idx, oslen = os.length(),
nslen = ns.length();
while (getline(cin, s)) {
idx = 0;
// while string is found in the line, replace it
while ((idx = s.find(os, idx)) != string::npos) {
s.replace(idx, oslen, ns);
idx += nslen;
}
cout << s << endl;
}
return 0;
}
Note: there are several versions of replace; e.g., a more general
version is: s.replace(pos1, n1, s2, pos2, n2)


===========================
Tokenizing a Sting

	Break up a string at delimiters

	ab.cde;fg,hi: //original string
	":,;." //delimiters

	"ab", "cde", "fg", "hi" //tokens

	next_token //returns the next token

	:ab.cde;fg,hi:

		find first of //:
		find first not of //a

===========================

eg. use find_first_of(":,;.")

	//tokenize.cpp

#include <iostream>
#include <string>
#include <vector>
using namespace std;

//return empty string when there are no tokens
string
next token(const string& s, const string& delim, string::size_type& start) {

	//the first non-delimiter is the begining of a token

	string::size_type pos = s.find_first_not_of(delim, start);
	if(pos==string::npos) { //no non-delimiter; hence no more tokens
		return ""; //empty string
	}
	//the next delimiter terminates the token
	start = s.find_first_of(delim, pos);

	if(start == string::npos) //these 2 lines are not really necessary
		return s.substr(pos);


	return s.substr(pos, start - pos); // this actually works when start equals string::npos
}


vector<string>
tokenize(const string& s, const string& delim) {


	//string::size_type start = 0;
	//	string tok;
	string::size_type start = 0;
	auto pos = s.find_first_not_of(delim, start);

	vector<string> v;
	while(1) {
		if (pos == string::npos)
			return v;
		start = s.find_first_of(delim, pos);

		while ((!tok = next_token(":ab.cde;fg,hi:", ".;:,", start)).empty())
			v.push_back(tok);
	}

}

int main() {
	string::size_type start = 0;
	string tok;
	auto v = tokenize((":ab.cde;fg,hi:", ".;:,");
	for (auto& s: v)
		cout << s << endl;
}

===========================

#include <iostream>
#include <string>
#include <cctype>
using namespace std;

string& //c++11 range-based for-loop
uppercase(string& s) {
	for (auto& c: s)
		c = toupper(c);
	return s;
}

string&
uppercase2 (string& s) {
	string::size_type i;
	for (i=0;i<sz;i++)
		s[i] = toupper(s[i]);
	return s;
}

int main() {
	string s("hello"), t("world");

	cout << uppercase(s) << endl;
	cout << uppercase2(t) << endl;
}

===========================

STL (Standard Template Library) //consists of class templates and function templates

	Components:
		1. Containers //hashmap, array lists
		2. Generic algorithms //simple algorithms
		3. Interator //decouples the container from algorithms
			Glue between containers AND algorithms
			Algorithms accepts iterators
			Containers provide iterators

		4. Function objects //an object that acts like functions
				f(0) ----> f.operator()(0)
				Why do we need function objects?
					A function object can store state.

			lamdas - anonymous functions
				[](int n) { return n > 0; }
				//How to store lamda
				int n = 1;
				auto f = [](int n) { return n > 0; }


Example

	find_if (first, last, pred)
		//first, last are both iterators
		//pred = return an iterator, if return value is same as last; it is same as not found

	The STL uses half-open ranges.
	Think of an iterator as a position indicator.
	(Iterators are generalizations of pointers)
		int a[] = {3,2,7,6,8}; //analogy
		int *first = a;
		int *last = a+5;
			in math.. we use [first,last) //half-open range

	it_iterator
	it++, ++it, *it //we can think of iterators like pointers
					//can increment, decrement, compare

	auto p = find_if(a, a+5, [](int n) {return n%2==0; }); //store in a pointer
	if(p!=a+5)
		cout << *p << endl;

===========================
Vector type //dynamic array that can grow at the end

//vector.cpp

#include <iostream>
#include <vector>
using namespace std;

int main() {
	vector<int> v;

	v.push_back(3);
	v.push_back(2);
	v.push_back(7);
	v.push_back(6);
	v.push_back(8);

	vector<int>::iterator it; //nested type; works for all containers
			   ::const iterator //if we don't want to change
	for(it = v.begin(); it != v.end(); ++it)
		cout << *it <, endl; //32768

	cout << endl;
	for(vector<int>::size_type i = 0; i < v.size(); i++) { //only works for containers that provide random access
		cout << v[i] <, endl;
	}

	cout << endl;
	//simplier
	for(auto& x: v) //range based forloop version; gets translated by compiler to the iterator version
		cout << x << endl; //32768
		x*=2; //should change original

	for(const auto& x: v) //const show that we are not changing the original
		cout << x << endl;
}

===========================
STL

	Containers : use value semantics: a container gets a copy of the object you put in.

	Algorithms: operate on iterators; half-open range specified by 2 iterators

	Iterators: generalization of pointers; have "pointer" operations: ++, --, *, !=, ==, ...

	Function objects/lamdas : to customize algorithms (eg. sorting order)


Iterators

	different ways of generalizing pointers - this leads to different categories of iterators

1. input iterator : can only be used for reading; for single-pass algorithms

	some operations: *it, it++, ++it, it1==it2, it1!=it2
	(NOT allowed: *it = x, --it, it--, it1 < it2, ...)

	eg. istream_iterator<T> // can be int, double or string

2. Output iterator: can only be used for writing; for single pass algorithms
	some operations: *it = x, it++, ++it
	(NOT allowed: --it, it--, it1==it2, it1!=it2,it1<it2,...)

	eg. ostream_iterator<T>

3. forward iterator: both input and output iterator (can read and write)
	for single pass algorithms

	some operations: *it, *it=x,it++,++it, it1==it2, it1 != it2
	(NOT allowed: --it, it--, it<it2, ...)

	//for linked lists, not for arrays

	eg. iterators associated with forward_list<T>

4. reverse iterator: forward iterator with additional operations :
	--it, it--
	(NOT allowed: it1<it2, ...)

	eg. iterators associated with the List<T>

5. random access iterator: reverse iterator with additional operations:
	it1 < it2, it+n=(int)n

	eg.

		iterator associated with vector<T> + deque<T>

Iterators associated with containers:

	c - container
	c.begin()/c.end  //type = iterator
	c.cbegin()/c.cend() //const_iterator
	c.rbegin()/c.rend() //reverse_iterator
	c.crbegin()/c.crend() //const_reverse_iterator

===========================
vector<T>

	The objects are like dynamic arrays	that can grow at the end

	They support random access iterator

Standard way to loop through a container:

for(it = c.begin(); it != c.end(); ++it) //may be more efficient than it++
	/*process*/

===========================
vector2.cpp



#include <iostream>
#include <vector>
using namespace std;

int main() {
	vector<int> v{3,2,7,6,8};
	int a[] = {6,5,5,3,6};
	vector<int> v2(a, a+5); //ctor that takes a range
/*
	for (auto& x: v) //ranged based for-loop; cannot go backwards
		cout << x << endl;
*/
/*
	for (auto it = v.rbegin(); it != v.rend(); ++it) //++ means going backwards in reverse
		cout << *it << endl;
*/


	v.insert(v2.begin(), 1); // insert takes an iterator
	for (auto& x: v2)
		cout << x << endl;

	v2.insert(v2.begin() + 3, -1); //insert before the 4th element
	v2.insert(v2.end(), v.begin(), v.end());
	for (auto& x: v2)
		cout << x << endl;


}

===========================
//vector3.cpp

#include <iostream>
#include <vector>
using namespace std;

void print(const vector<int>& v) {
	for (auto& x : v)
		cout << x << ' '; //276
	cout << endl;

}

int main() {
	vector<int> v{3,2,7,6,8};
	vector<int> v2(v.begin() + 1, b.begin() + 4);


	print(v2);

	cout << v2.front() << ' ' << v2.back() << endl;

	v2.insert(v2.end(), v.begin(), v.end());
	print(v2);

	v2.erase(v2.begin() + 1);
	print(v2);

	v2.pop_back(); //removes the last number
	print(v2);

	v2.erase(v2.begin(), v2.begin() + 3);
	print(v2);

	v2.resize(1); //resize to 1 number
	print(v2);

	v2.clear(); //removes everything
	print(v2);
}

===========================

Deque = dynamic array that can grow at both ends

//vector3.cpp

#include <iostream>
#include <deque>
using namespace std;

void print(const deque<int>& v) {
	deque<int>::size_type i, sz = v.size();
	for(i = 0; i < sz; i++) {
		cout << v[i] << ' '; //only works for vector & deque; [] square bracket means random acces iterator required
	}
	cout << endl;
	/*
	for (auto& x : v)
		cout << x << ' '; //276
	cout << endl;
	*/

}

int main() {
	deque<int> v{3,2,7,6,8};
	deque<int> v2(v.begin() + 1, b.begin() + 4);


	print(v2);

	cout << v2.front() << ' ' << v2.back() << endl;

	v2.insert(v2.end(), v.begin(), v.end());
	print(v2);

	v2.erase(v2.begin() + 1);
	print(v2);

	v2.pop_back(); //removes the last number
	print(v2);

	v2.erase(v2.begin(), v2.begin() + 3);
	print(v2);

	v2.resize(1); //resize to 1 number
	print(v2);

	//v2.clear(); //removes everything
	//print(v2);

	//motheds here are common to deque, lists, and vector

	/*Methods not in vector*/
	v2.push_front(-1); //pish -1 in front
	printf(v2);

	v2.pop_front(); //remove the front
	printf(v2);

}

Deque = bank queue
Vector = grow in back of the line

===========================
List //cannot use +position, because it is a list; inefficient

//vector3.cpp

#include <iostream>
#include <list>
using namespace std;

void print(const list<int>& v) {
	for (auto& x : v)
		cout << x << ' '; //276
	cout << endl;

}

int main() {
	list<int> v{3,2,7,6,8};
	list<int> v2(v.begin() + 1, b.begin() + 4);


	print(v2);

	cout << v2.front() << ' ' << v2.back() << endl;

	v2.insert(v2.end(), v.begin(), v.end());
	print(v2);

	v2.erase(v2.begin() + 1);
	print(v2);

	v2.pop_back(); //removes the last number
	print(v2);

	v2.erase(v2.begin(), v2.begin() + 3);
	print(v2);

	v2.resize(1); //resize to 1 number
	print(v2);

	//v2.clear(); //removes everything
	//print(v2);

}

===========================
Merge Sort (sort a vector v)

	is a recurisive algorithm
	Recursive require a base case.

	Base case:
		if v.size() <= 1, it is already sorted

	Recurisive case:
		divide v into 2 halves

		recurisively sort the 2 halves

		merge the 2 sorted halves

Merge:
				//both sorted
	eg. 1, 4, 7, 11 		2, 3, 6, 13
				//compare; smaller gets put in list
		1, 2, 3, 4, 6, 7, 11, 13


===========================
//merge sort example
#include <iostream>
#include <vector>
using namespace std;

vector<int>
merge(const vector<int>& v1, const vector<int>& v2) {
	vector<int> result;
	vector<int>::size_type i1 = 0, i2 = 0, n1 = v1.size(), n2 = v2.size();
	//compare as long as both have not ended

	result.reserve(n1 + n2); //allocate memory to reduce reallocation

	while(i1 < n1 && i2 < n2)
		result.push_back(v1[i1] < v2[i2] ? v1[i1++] : v2[i2++]);

	result.insert(result.end(), v1.begin() + i1, v1.end());
	while(i1 < n1)
		result.push_back(v1[i1++]);

	result.insert(result.end(), v2.begin() + i2, v2.end());
	while(i2 < n2)
		result.push_back(v1[i2++]);

	return result;
}

vector<int>
mergesort(const vector<int>& v) {
	auto sz = v.size();
	if(sz <= 1)
		return v;

	auto beg = v.begin();
	return merge(mergesort(vector<int>(beg, beg + sz/2)),
		    	 mergesort(vector<int>(beg + sz/2, v.end())));
}

int main() {
	vector<int> v1 {1,4,7,11}, v2{2,3,6,13};

	for (auto& x: mergesort(v))
		cout << x << ' ';
	cout << endl;


}


===========================
Week 5
===========================

None-recursive Merge Sort

eg. 3, 2, 7, 6, 8

	In essense, we put numbers in a queue and we keep on merging. We always take thr first 2 elements are merge them and put them back.

//mergesort.cpp
#include <iostream>
#include <vector>
#include <deque>
using namespace std;

vector<int>
merge(const vector<int>& v1, const vector<int>& v2) {
	vector<int> result;
	vector<int>::size_type i1 = 0, i2 = 0, n1 = v1.size(), n2 = v2.size();
	//compare as ong as both have not ended

	result.reserve(n1 + n2); //allocate memory to reduce reallocation

	while(i1 < n1 && i2 < n2)
		result.push_back(v1[i1] < v2[i2] ? v1[i1++] : v2[i2++]);

	result.insert(result.end(), v1.begin() + i1, v1.end());
	while(i1 < n1)
		result.push_back(v1[i1++]);

	result.insert(result.end(), v2.begin() + i2, v2.end());
	while(i2 < n2)
		result.push_back(v1[i2++]);

	return result;
}

//non-recurisive
//when will it break?
//pre-condition: v.size() > 0
vector<int>
mergesort_nr (const vector<int>& v) {
	deque<vector<int>> d; //each element in deque is a container

	for (auto& x: v)
		d.push_back(vector<int>(1,x));

	//keep on merging until there is only 1 element in deque
	while(d.size()> 1) {
		d.push_back(merge(d[0], d[1]));
		d.pop_front();
		d.pop_front();
	}

	return d[0];
}

int main() {
	vector<int> v1 {1,4,7,11}, v2{2,3,6,13};

	for (auto& x: mergesort_nr(v))
		cout << x << ' ';
	cout << endl;
}

===========================
QuickSort

	Choose pivot (an element in the container we are sorting)
	Divide the container (minus the pivot) into 2 parts:

	p1: elements less than pivot

	p2: elements not less than the pivot

	Recurisively quicksort p1
		..           ..    p2

	Concatenate: sorted p1, pivot, sorted p2

===========================

//qsort.cpp
#include <iostream>
#include <vector>
using namespace std;

//pre-condition: v.size() > 0
pair<vector<int>, vector<int>>
partition(const vector<int>& v) {
	pair<vector<int>, vector<int>> result;

	int pivot = v[0];

	for (vector<int>::size_type i = 1; i < v.size(); i++)
		if (v[i] >pivot)
			result.first.push_back(v[i]);
		else
			result.second.push_back(v[i]);

	return result;
}

vector<int>
operator+(const vector<int>& v1, const vector<int)& v2) {
	vector<int> result(v1);

	result.insert(result.end(), v2.begin(), v2.end());
	return result;
}

vector<int>
qsort(const vector<int>& v) {
	if (v.size() <= 1)
		return v;

	auto p = partition(v);
	return qsort(p.first) + vector<int>(1,v[0]) + qsort(p.second);

}

int main() {
	vector<int> v{3,2,7,6,8,6,5,5,3,6};

	for (auto& x : qsort(v)
		cout << x << ' ';
	cout << endl;
}

===========================

#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
#include <cstdlib>
using namespace std;

template<typename Container>
void print (const Container& c) {
	for (auto& x: c)
		cout << x << ' ';
	cout << endl;
}

int main() {
	//vector<int> v{3,2,7,6,8};
	int a[1000000];

	generate_n(a, 1000000, []() { return rand() % 100000; });

	//sort(v.begin(), v.end(), greater<int>()); //comparison
	//sort(v.begin(), v.end(), [](int a, int b) { return a > b; }); //lamda compairson

	sort(a, a + 1000000); //lamda compairson
	//print(v);
/*
	for (size_t i = 0; i < 1000000; i++)
		cout << i << ' ';
	cout << endl;
*/
	cout << is_sorted(a, a+1000000) << endl;

}

===========================
Sequence Containers
	Vector, Deque, Lists


===========================
//sort2.cpp

#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

struct Record {
	string id;
	int score;



	Record(): id("A00000000"), score(0) {	//default ctor
		cout << "Record()" << endl;
	}
	Record(const string& i, int s): id(i), score(s) {
		cout << "Record(const string& i, int s)" << endl;
	}
	Record(const Record& src): id(src.id), score(src.score) {
		cout << "Record(const Record&)" << endl; 
	}
}

// sort needs this to compare records
bool 
operator<(const Record& lhs, const Record& rhs) {
	return lhs.id < rhs.id;
}

bool
cmp(const Record& lhs, const Record& rhs) {
	if (lhs.score != rhs.score)
		return lhs.score > rhs.score; 	//descending order of score
	return lhs.id < rhs.id;				//ascending order of ids if same score
}

istream& //so cin can use it
operator>>(istream& is, Record& r) { 
	return is >> r.id >> r.score; // note: no error-handling or data validation
	//return is;
}

ostream&
operator<<(ostream& os, const Records& r) { //printing const; not changing
	return os << r.id << ' ' << r.score;
}

template<typename Container>
void print(const Container& c) {
	for (auto& x : c)
		cout << x << endl;
}
int main() {
	//vector<int> v;
	//int 		n;
	vector<Record> 	v;
	Record 			r;	//calls default ctor; can be automatically generated by the compiler
						//in this case
	string 			id;
	int 			score;


	r.reserve(10); // to prevent re-size; if we know how much space we need

	//while (cin >> n)
	//	v.push_back(n);
	//while (cin >> r)
		//v.push_back(r);	//calls copy ctor; automatically generated by compiler
						//in this case
		//v.push_back(Record(id, score));

	while (cin >> id >> score)
		v.emplace_back(id,score);


	//sort(v.begin(), v.end());
	//stable_sort(v.begin(), v.end()); //preserve order of equilivent element
	stable_sort(v.begin(), v.end(), cmp);

	print(v);
}

===========================

STL containers

	1. sequence container // order is determined by where we insert

		vector, deque, list (doubly-linked)

		array, forward_list (singly-linked) 

	2. (ordered) associative containers // uses an internal order (sorted)

		set/multiset, map/multimap 

			Is something in the set or not in the set?

			Multiset allows for duplicates.

			Map = dictionary //key and a value

			Multimap = allows for duplicate keys

	3. unordered associative containers (C++11) // not sorted

		unordered-set/unordered-multiset, unordered map/unordered multimap

The sort algorithm:

	default uses < 

	stable sort: preserves relative order of equivalent elements

	sort (first, last, cmp); //iterator, iterator, function

		cmp needs to have certain properties

		1. cmp(x,x) should return false

		2. cmp(x,y) is true & cmp(y,q) is true

			if => cmp(x,q) is true

		a is equivalent to b if 

		both cmp(a,b) & cmp(b,a) are false

		(think of a!<b and b!<a)


===========================
//sort2.cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Record {
	string id;
	int score;

	Record(): id("A00000000"), score(0) {	//default ctor
		cout << "Record()" << endl;
	}
	Record(const string& i, int s): id(i), score(s) { 
		cout << "Record(const string& i, int s)" << endl;
	}
	Record(const Record& src): id(src.id), score(src.score) {
		cout << "Record(const Record&)" << endl; 
	}
	Record(Record&& src): id(std::move(src.id)), score(src.score) { //move ctor
		cout << "Record(Record&&)" << endl;
	}
}

int main() {
	vector<Record> v;

	v.reserve(10);
	v.push_back(Record{"a11111111", 55});

	//v.emplace_back("a11111111", 55);

}

===========================

Quicksort

//first
	[>pivot	]
	[		] //unclassified
	[=pivot	]
	[<pivot	]
//last

			  //last
	[>pivot	] //greater_beg
	[		] //equal_end
	[=pivot	] //less_end
	[<pivot	] //first

#include <utility>
#include <iterator>
#include <list>
#include <iostream>
#include <algorithm>
using namespace std;

template<typename Container>
void print(const Container& c) {
	for (auto& x: c)
		cout << x << ' ';
	cout << endl;
}	

//real qsort.cpp
template<typename Iterator>
pair<Iterator, Iterator>
my_partition(Iterator first, Iterator last) {
	auto pivot = *first;
	Iterator less_end = first, equal_end = first, greater_beg = last;

	while (equal_end != greater_beg) { // there are still unclassified elements
		if(*equal_end < pivot)
			std::swap(*equal_end++, *less_end++);
		else if (*equal_end == pivot)
			++equal_end;
		else
			std::swap(*--greater_beg, *equal_end);
 	}

 	return {less_end, equal_end}; //{} converts to pair; range of equal elements
}

template<typename Iterator>
void
qsort(Iterator first, Iterator last) {
	if (std::distance (first, last) <= 1)
		return;

	auto p= my_partition(first, last);
	qsort(first, p.first);
	qsort(p.second, last);

}

int main() {

	//list<int> lst{3,2,7,6,8};
	//qsort(lst.begin(), lst.end());

	int a[] = {3,2,7,6,8};
	qsort(a, a+5);
	print(a);
	//cout << is_sorted(lst.begin(), lst.end()) << endl;
	//cout << is_sorted(a, a+5) << endl;

}


===========================

//list.cpp

#include <iostream>
#include <list>
#include <iterator>
#include <algorithm>
using namespace std;

template<typename Container>
void print(const Container& c) {
	for (auto& x: c)
		cout << x << ' ';
	cout << endl;
}	

struct counter {
	int count = 0;
	void operator()() {
		cout << ++count << endl;
	}
};

struct sum_product {
	int sum = 0, product = 1;
	void operator()(int n) {
		sum += n;
		product *= n;
	}
};

struct print_if_divisible {
	int divisor;
	print_if_divisible(int d): divisor(d) {}
	void operator() (int n) {
		if(n % divisor == 0)
			cout << n << endl;
	}
};

int main() {
	list<int>	lst{3,2,7,6,8,1,6,8,2,1};
	//int 		a[] = {-1, -2, -3};
	//lst<int> 	lst2(a,a+3);

	//auto it = find(lst.begin(), next(lst.begin(), 5), -1);
	
	//auto end = next(lst.begin(), 5);

	//auto it = find_if(lst.begin(), end, [](int) { return n % 4 == 0;});
	//auto it = for_each(lst.begin(), lst.end(), [](int n) { cout << n << endl; });
	

/*
	counter c1, c2;
	c(); c1(); c1(); c1();
	cout << "****" << endl;
	c2(); c2(); 
*/

/*	//for_each
	auto sp = for_each(lst.begin(), lst.end(), sum_product() );
	cout << "sum: " << sp.sum << endl;
	cout << "product: " << sp.product << endl;
*/

	int divisor;
	cout <, "enter a divisor: ";
	if(!(cin >> divisior))
		return 0;
	for_each(lst.begin(), lst.end(), print_if_divisible(divisor));

	//if(it!=next(lst.begin(), 5))
	//	cout<< *it << endl;
	//else cout << "not found" << endl;

	//lst.push_back(-1);
	//lst.push_front(0);
	//lst.insert(next(lst.begin(), 3), a, a+3); //insert before 4th element
	//print(lst);
}

===========================

for_each

	template<typename InputIterator, typename UnaryFunction>
	UnaryFunction for_each(InputIterator first, InputIterator last, UnaryFunction f) {

		while (first!= last) {
			f(*first); //apply f to each element
			++first;
		}
		return f; 
	}


===========================
Week 6
===========================

vector/deque/list
find/find_if/sort/for_each
set/map
copy
const char* // primitive type, not a class
string // class

pair //first and second
	
	pair<string, int> p("home",10); //ctor
	pair<string, int> q; 
	q=make_pair<string, int> ("home", 10); //need to specify string else homer will be seen as const char*
	pair<int, double> r; 
	r= make_pair(3, 3.14);

Assignment 1 on shareout.

===========================
#include <iostream>
#include <set>
using namespace std;

template<typename Container>
void print(const Container& c) {
	for (auto& x: c)
		cout << x << ' ';
	cout << endl;
}


int main() {
	set<int>	s{3,2,7,6,8,2};

	cout << s.size() << endl; //5, sets do not allow duplicates

	print(s); // a set is sorted in increasing order by default

	// in general you don't specify a position to insert in a set
	// it uses < (or rather less) for comparing elements in the set

	s.insert(1);
	s.insert(5);
	print(s);

	//pair<set<int>::iterator, bool> p = s.insert(2); //  2 is not inserted
	auto p = s.insert(2); //  2 is not inserted
	if (!p.second)
		cout << "2 not inserted" << endl;

	if(!s.insert(3).second)
		cout << "3 not inserted" << endl;

	print(s);

}

===========================

map - dictionary

key/value pairs //in map

===========================
#include <iostream>
#include <map>
using namespace std;

template<typename Container>
void print(const Container& c) {
	for (auto& x: c)
		cout << x << ' '; 
	cout << endl;
}

string find_by_seqno(const map<int,string>& m, int seqno) {
	// return m[seqno]; // doesn't compile; [] is not a const method
	auto p = m.find(seqno); // find is a const method
	if (p != m.end())
		return p->second;
	return "hell";
}

int main() {
	//map<int, string> m {pair<int, string>(1,"homer")};
	// it is sorted in increasing order of keys
	map<int, string> m {{1,"homer"}, {3, "lisa"}, {2, "monty"}}; // a map contains key-value pairs

	for (auto& x: m)
		cout << x.first << ' ' << x.second << endl;

	// use [] to look up the value for a key
	// should only use [] if we are sure that the key is in the map (not a good way!)
	// m[1] actually stores something in the map with key = 1 if it was not already in the map
	// cant use on const map
	cout << m[1] << endl; 

	// no << that stores pairs
	//print(m);
}
===========================
Program to sort words & eliminate duplicates

//set2.cpp


#include <iostream>
#incldue <string>
#include <set>
using namespace std;


template<typename Container>
void print(const Container& c) {
	for (auto& x: c)
		cout << x << endl;
}

int main() {
	set<string> s;
	string word;

	while (cin >> word)
		s.insert(word);

	print(s);

}

===========================
//word frequencies

#include <iostream>
#incldue <string>
#include <map>
using namespace std;

int main() {
	map<string, size_t> count;
	string word;

	while (cin >> word)
		cout[word]++; 	// the first time we index we store a 0
						// first time we use count[word], a 0 is stored

	for (auto& p: count)
		cout << p.first << ' ' << p.second << endl;
}


===========================

Sets & Multisets

• provide fast retrieval of elements (keys)
• elements must be unique in sets; multisets allow duplicate
elements
• elements are ordered by “less-than” (less<T>) by default
• should not modify the value of an element via an iterator;
remove & insert a new one instead
• provide special search functions:
– find(elem) returns the position of the first element
equivalent to elem or end()
– lower bound(elem) returns the position of the first element not less than elem
– upper bound(elem) returns the position of the first element “greater than” elem
– equal range(elem) returns a pair
∗ whose first is lower bound(elem)
∗ whose second is upper bound(elem)
(it basically returns a range of elements equivalent to
elem)
if equal range(elem).first==equal range(elem).second,
elem is not found
– count(elem) returns the number of elements equivalent
to elem
0
#include <iostream>
#include <set>
using std::multiset;
using std::cout;
using std::endl;
int main() {
multiset<int> s;
s.insert(2);
s.insert(1);
s.insert(2);
s.insert(3);
s.insert(5);
s.insert(2);
s.insert(5);
cout << s.count(2) << endl; // print: 3
// note syntax; print: 5,5
cout << *s.lower_bound(4) << ","
<< *s.upper_bound(4) << endl;
// print: 3,5
cout << *s.equal_range(3).first << ","
<< *s.equal_range(3).second << endl;
s.erase(2); // remove all 2s; returns number of
// elements removed
// print: 1 3 5 5
multiset<int>::iterator it;
for (it = s.begin(); it != s.end(); ++it)
cout << *it << " ";
cout << endl;
}
1
– all standard associative containers have an insert:
void insert(InputIterator begin, InputIterator end);
where begin & end specify the range of objects to
insert.
– all standard associative containers have an erase:
iterator erase(iterator begin, iterator end);
where begin & end specify the range to erase. It returns an iterator to the element that follows the last
element removed (or to end()). (Note: return type
was void before C++11)
– for multiset (& multimap), insert(elem) returns an iterator pointing to the newly-inserted element
– for set (& map), insert(elem) returns a pair whose
∗ first is an iterator pointing an element in the container equivalent to elem
∗ second is a boolean value — it is true if and only if
elem is actually inserted into the set (i.e. an equivalent element was not in the set before)
– standard associative containers support bidirectional
iterators
2
Maps
• provide fast retrieval of objects (values) based on keys
• keys must be unique
#include <iostream>
#include <string>
#include <map>
using namespace std;
int main() {
map<string, string> phonebook;
phonebook["jason"] = "123-4567";
phonebook["stephen"] = "123-5678";
// etc
string name;
map<string, string>::iterator it;
while (cin >> name) {
if ((it = phonebook.find(name)) != phonebook.end())
cout << it->second << endl; // (*)
else
cout << "can’t find " << name << endl;
}
}
– in the above, we can replace the line labelled (*) by
cout << phonebook[name] << endl;
once we know the name is in the phonebook
– note that a map is ordered by the “less-than operator”
of the key by default
3
– to create a map to store exam scores, we could use
map<string, int> scores; in this case, the name is the
key & the exam score is the value
– an iterator can be used to go through a map; in the
example above, we would use something like:
for (auto it = phonebook.begin();
it != phonebook.end(); ++it)
cout << it->first << "," << it->second << endl;
Note that we need to use the first & second members to access the key & value respectively as a map
essentially stores pairs
– note that in the phonebook example, the line
phonebook["jason"] = "123-4567";
first initializes jason’s phone to the default string (using the default ctor of string) before assigning "123-4567"
to it; for built-in arithmetic types, 0 is used as the default value
However, if an equivalent key is already in the map,
the code changes the corresponding value
– another way to insert the key/value pair is
phonebook.insert(make_pair<string, string>(
"jason", "123-4567"));
Rather than modifying the corresponding value, this
fails if an element with an equivalent key is already in
the map. (See info on insert for set.)
4
Multimaps
• provide fast retrieval of objects (values) based on keys
• allow duplicate keys
#include <iostream>
#include <string>
#include <map>
using namespace std;
int main() {
multimap<string, string> phonebook;
phonebook.insert(make_pair<string, string>(
"stephen", "123-5678"));
phonebook.insert(make_pair<string, string>(
"albert", "123-6789"));
phonebook.insert(make_pair<string, string>(
"albert", "123-0000"));
// etc
string name;
multimap<string, string>::iterator it;
while (cin >> name) {
for ( it = phonebook.lower_bound(name);
it != phonebook.upper_bound(name); ++it)
cout << it->second << endl;
}
}
5
• as with map, & similar to set & multiset
– lower bound(a key) returns the position of the first element whose key is not less than a key; if there are
no such keys, it returns end()
– upper bound(a key) returns the position of the first element whose key is greater than a key; if there are no
such keys, it returns end()
– equal range(a key) returns a pair
∗ whose first is lower bound(a key)
∗ whose second is upper bound(a key)
Exercise: Modify the program so that it prints a message
when the name entered is not in the multimap
6

===========================

//set3.cpp


#include <iostream>
#incldue <string>
#include <set>
using namespace std;

struct Record {
	string id;
	int score;
/*
	Record(): id("A00000000"), score(0) {	//default ctor
		cout << "Record()" << endl;
	}
*/
	Record(const string& i, int s): id(i), score(s) {
		//cout << "Record(const string& i, int s)" << endl;
	}
/*
	Record(const Record& src): id(src.id), score(src.score) {
		cout << "Record(const Record&)" << endl; 
	}
*/
}

bool 
operator<(const Rercord& lhs, const Record& rhs) {
	return lhs.id < rhs.id;
}

ostream&
operator<<(ostream& os, const Record& r) {
	return os << r.id << ' ' << r.score;
}

istream&
operator>>(istream& is, Record& r) { //no const; write
	return is >> r.id >> r.score;
}

struct ScoreCmp {
	bool operator() (const Record& lhs, const Record& rhs) const {
		if (lhs.score != rhs.score)
			return lhs.score > rhs.score;
		return lhs.id < rhs.id;
	} 
};
	
template<typename Container>
void print(const Container& c) {
	for (auto& x: c)
		cout << x << endl;
}

int main() {
/*
	set<Record> s;
	Record 		r;

	while (cin >> r)
		s.insert(r);

	print(s);
*/


	set<Record>	s;
	string 		id;
	int 		score;

	while (cin >> id >> score) 
		s.emplace(id,score); //don't make copy; two are passed into ctor
	for (auto& r : s)
		cout << r.id << ' ' << r.score << endl;

	//what if we need another set of record sorted in different way?

	set<Record, ScoreCmp> 	s2; // system uses a ScoreCmp object to compare records stored in this set

}

===========================

//multiset.cpp

#include <iostream>
#include <cassert>
#include <set>
using namespace std;

int main() {
	multiset<int>	s;

	s.insert(5);
	s.insert(2);
	s.insert(2);
	s.insert(1);
	s.insert(2);
	s.insert(7);


	auto it1 = s.lower_bound(2); //returns an iterator pointing to the first element not less than 2
	auto it2 = s.upper_bound(2); //returns an iterator pointing to the first element bigger than 2

	for (auto it = it1; it != it2; ++it)
		cout << *it << endl;

	cout << s.count(2) << endl;

	auto p = s.equal_range(2); //returns pair where first is lower_bound and second is upper_bound
	assert(p.first == it1 && p.second == it2); //if assertion false, the program will abort


}

===========================

//map3.cpp

#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
	map<string, int> 	m;
	string 				id;
	int 				score;
	while (cin >> id >> score)
		m.insert(make_pair(id, score)); //this fails if key is already in the map

		//m.insert({id, score}); {} calls the ctor for pair

		//m[id] = score; 	// this changes the corrosponding value if the key already exist

	for (auto& p : m)
		cout << p.first << ' ' << p.second << endl;

}

===========================

set<T> 			//sorted
set<T,cmp>		//class of function objects

map <key,value> //sorted by keys 	it m = find(key)
map <key, value, cmp> // class od function objects for comparing keys

insert(value)	//erase(it)
				//erase(it1,it2)
				//erase(value) // not in vector/deque

insert(it1, it1) //specify range

copy/copy_if
===========================

template <typename inputiterator, typename outputiterator>
outputIterstor
copy(InputIterator first, InputIterator last, OutputIterator result) {
	while (first != last) 
		*result = *first;
	++result; ++first;
}
return result;

template<typename inputiterator, typename outputiterator, typename unarypredicate>

OutputIterator
copy_if(inputiterator first, inputiterator last, outputiterator result, unarypredicate p) {
	while (first != last) {
		if (p(*first))
			*result++ = *first;
			++first;
	}
	return result;
}

===========================

transform

template<typename inputiterator, typename outputiterator, UnaryFunction>
OutputIteratortransform(inputiterator first, inputiterator last, outputiterator result, UnaryFunction f) {
	while (first != last) {
		*result = f(*first);
		++result; ++first;
	}
	return result;
}

there is a 2nd version of transform that takes a binary function

===========================

#include <iostream>
#include <vector>
#include <deque>
#include <list>
#include <algorithm>
#include <iterator>
using namespace std;

void print(const Containers& c) {
	for (auto& x: c) {
		cout << x << endl;
	cout << endl;
	}
}

int main() {
#if 0
	vector<int> v{3,2,7,6,8};
	list<int> 	lst{0,0,0,0,0};
	copy(v.begin(), v.end(), lst.begin()); //note: this overwrites the destination

	deque<int>	d;
	d.resize(10);
	auto it = copy_if(v.begin(), v.end(), d.begin(), [](int n) { return n % 2 == 0; });
	
	for(auto i = d.begin(); i != it; ++i)
		cout << *i << endl;

	cout << distance(d.begin(), it) < endl;
	//print(lst);

	cout << it - d.begin() << endl;
#endif

	vector<int> v1{3,2,7,6,8};
	deque<int> D1{6,5,3,6,1,2};
	list<int> lst1;

	lst.resize(5);
	transform(v1.begin, v1.end(), d1.begin(), lst1.begin(), [](int a, int b) {retuirn 2*a + 3*b});
	print(lst1);

	transform(v1.begin(), v1.end(), v1.begin(), [](int n) {return 2*n;});
	return (v1);
#endif

	vector<int> vv{3,2,7,6,8};
	list<int> l;
	trandform(vv.begin(), vv.end(), back_inserter(l), [](int n) { return 2 * n;});	//calls push_back

	print(l);
 }


===========================
Week 7
===========================

#include <iterator>

//class template  	//function template
back_insert_iterator / back_inserter //calls push_back

front_insert_iterator / front_inserter //calls push_front

insert_iterator / inserter //calls insert

vector<int> {...};
list<int> lst;

copy(v.begin(), v.end(), lst.begin()); //invalid; list is empty

Invalid because it overwrites the list.

//hard version
copy(v.begin(), v.end(), back_insert_iterator<list<int>>(lst)); //temporary back_insert_iterator

//easier version
copy(v.begin(), v.end(), back_inserter(lst)); // function template

//How does function template work?
template<typename C>
inline back_insert_iterator<C>
back_inserter(C& c) {
	return back_insert_iterator<C>(c);
}


//push_front
copy(v.begin(), v.end(), front_inserter(lst)); 

//takes container and position to insert
copy(v.begin(), v.end(), inserter(lst,lst.begin()));


//iterator associated with an ostream
ostream_iterator
		
//iterator associated with an istream
istream_iterator

//ostream_iterator example
copy(v.begin(), v.end(), ostream_iterator<int>(cout, "\n")); //cout & separator
										    ^ calls << to print

//istream_iterator example
istream_iterator<int> in(cin);

istream_iterator<int> eof; //default ctor; ctor that takes no argument


===========================

//iterator.cpp

#include <vector>
#include <list>
#include <iterator>
#include <algorithm> //copy
#include <iostream>
#include <deque>
using namespace std;

//print function
template<typename Container>
void print(const Container& c) {
	for (auto& x: c)
		cout << x << ' '; 
	cout << endl;
}

int main() {
	vector<int> v.{3,2,6,7,8};
	deque<int> 	d{6,5,5,3,4};
	list<int>	lst1,lst2;

	copy(v.begin(), v.end(), front_inserter(lst1));
	print(lst1);
	copy(v.begin(), v.end(), inserter(lst2, lst2.begin()));
	print(lst2);
	copy(lst1.begin(), lst1.end, inserter(lst2, next(lst2.begin(), 3)));
	print(lst2); //3268762378
	//insert after the first 2 in lst2 3 times the numbers in d
	transform(d.begin(), d.end(), inserter(lst2, next(lst2.begin(), 2)), [](int n) { return 3 * n});
	print(lst2); 

}


===========================

//iterator.cpp

#include <vector>
#include <list>
#include <iterator>
#include <algorithm> //copy
#include <iostream>
#include <deque>
using namespace std;

//print function
template<typename Container>
void print(const Container& c) {
	for (auto& x: c)
		cout << x << ' '; 
	cout << endl;
}

int main() {
	vector<int> v.{3,2,6,7,8};
	deque<int> 	d{6,5,5,3,4};
	list<int>	lst1,lst2;

	copy(v.begin(), v.end(), front_inserter(lst1));
	print(lst1);
	copy(v.begin(), v.end(), inserter(lst2, lst2.begin()));
	print(lst2);
	copy(lst1.begin(), lst1.end(), inserter(lst2, next(lst2.begin(), 3)));
	print(lst2); //3268762378
	//insert after the first 2 in lst2 3 times the numbers in d
	transform(d.begin(), d.end(), inserter(lst2, next(lst2.begin(), 2)), [](int n) { return 3 * n});
	//print(lst2); 


	//ostream_iterator example
	copy(lst2.begin(), lst2.end(), ostream_iterator<int>(cout, " "));
	cout << endl;
}


===========================
//algo2.cpp
//harder version

#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>
using namespace std;

int main() {
	//using data.txt
	//123 123
	//-1 etc

	vector<int> v;
	copy(istream_iterator<int>(cin), istream_iterator<int>(), back_inserter(v));

	sort(v.begin(), v.end());
	copy(v.begin(), v.end(), ostream_iterator<int>(cout, " "));
	cout << endl;
}

===========================
//algo2.cpp
//easier version

#include <iostream>
#include <vector>
#include <set>
#include <string>
#include <iterator>
#include <algorithm>
using namespace std;

int main() {
	//using data.txt

	//compiler need to {} to interpretate function prototype
	multiset<int> v{istream_iterator<int>(cin), istream_iterator<int>()};

	copy(v.begin(), v.end(), ostream_iterator<int>(cout, " "));
	cout << endl;

/*
	vector<int> v2(10, 1);	// 10 copies of 1
	vector<int> v3{10, 1};  // vector of 2 int; 10 & 1
	cout << v2.size() << endl;	// 10
	cout << v3.size() << endl;	// 2
*/

	//set<string> s();	// function prototype
	
	istream_iterator<string> in(cin), eof;
	set<string> s(in, eof);
	copy(s.begin(), s.end(), ostream_iterator<string>(cout, " "));
	cout << endl;
}

transform in essense is a higher level process so we dont have to use forloop

{} vs () 
	1. void f(int n); // OK 
	2. void f(int (n)); // OK
	3. vector<int> v(istream_iterator<int>(cin), // 2
				     istream_iterator<int>()	 // Compiler thinks this function has a name
				     							 // {} fixes this




===========================
//misc.cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

bool is_palindrome(const string& s) {
	return s == string(r.rbegin(), s.rend()); // reverse string
}

/*
Container c
	
	c.begin()  	// point at begining
	c.end() 	// past end
	c.rend()	// before begining
	c.rbegin()	// point at end
*/

int main() {
	vector<int> c{3,2,7,6,8};
	copy(v.rbegin(), v.rend(), ostream_iterator<int>(cout, " "));
	cout << endl;
}
	

===========================

generate_n(OI, Size, Generator)

===========================

//records2.cpp
//recordsgen.cpp

#include <iostream>
#include <vector>
#inlcude <string>
#include <sstream>
#include <algorithm>
#include <cstdlib>
#include <iomanip>
#include <iterator>
using namespace std;

struct Record {
	string 	id;
	int 	score;
};

string create_id() {
	auto n = rand() % 10000
		ostringstream oss;
	oss << setw(8) << setfill('0') << n;
	return "a" + oss.str();
}

int create_score() {
	return rand() % 101 
}

Record create_record() {
	Record r;
	r.id = create_id();
	r.score = create_score();
	return r;
}

int main() {
	vector<Record>		v;
	generate_n(back_inserter(v), 10000, create_record);
	for (const auto& x: v) 
		cout << x.id << ' ' << x.score << endl;
}


// group id and score together 
map<string, vector/set/multiset> //	set and multiset eliminate duplicates

===========================

//q5 of the exam

#include <iostream>
#inlcude <string>
#include <set>
#include <map>
using namespace std;

int main() {
	string id;
	int score;
	map<string, set<int>> m;

	//m[key] = value 
	//m.insert(make_pair(key, value))

	while (cin >> id >> score) {
		m[id].insert(score);		//read all of them and divide into groups
	}

	for(auto& x: m) {
		cout <<  x.first << ": ";
		for (auto& y: x.second)
			cout << y << ' ';
		cout << endl;
	}
}

===========================

//group2.cpp


#include <vector>
#include <set>
#include <string>
#include <iostream>
using namespace std;

int main() {
	string 				id;
	int 				score;
	vector<set<string>> v(101); // size 0 unless declared

	cout << v.size() << endl;


	while (cin >> id >> score)
		v.[score].insert(id);	// fails; vector is empty; unlike map

	vector<set<string>>::size_type i;
	for (i=0; i<v.size(); i++) {
		cout << i << ": ";
		for(const auto& x: v[i])
			cout << x << ' ';
		cout << endl;
	}

}


===========================

//friend.cpp

#include <iostream>
#include <string>
using namespace std;

class Record { 		// class default is private
	string 	id;
	int 	score;
	/*
public:
	Record(const string& i, int s): id(i), score(s) {} // default ctor not generated because we created a ctor
	ostream& operator<<(ostream& os) {
		return os << id << ' ' << score;
	}*/

	friend ostream& operator<<(ostream& os, const Record& r); // prototype
};


ostream&
operator<<(ostream& os, const Record& r) {
	return os << r.id << ' ' << r.score;
}


int main() {
	//Record r; // the compiler automatically generates a default ctor for any class that does not have any ctor at all.
	// the compiler also automatically generaye a copy of ctor if we don't write our own copy ctor or move ctor
	Record r("a11111111", 80);
	Record r2(r);
	//r << cout; // public version
	cout << r;
}

===========================

//algo3.cpp

#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
#include <cstdlib>
using namespace std;

int main() {
	vector<int> 	v;
	generate_n(back_inserter(v), 30, []() { return rand() % 100; });
	copy(v.begin(), v.end(), ostream_iterator<int>(cout, " "));
	cout << endl;

	// remove all 3's
	//v.erase(remove(v.begin(), v.end(), 3), v.end());	// remove all 3
	v.erase(remove(v.begin(), v.end(), 
		[](int n) {return n % 2 == 0; }), v.end());	// remove all even
	copy(v.begin(), v.end(), ostream_iterator<int>(cout, " "));
	cout << endl;
}

===========================
Midterm Review
===========================
Office Hours 1-3 PM

Review lab
	Overload Input/Output operator
Review Lab 5
Review Labs
//NO function overloading
//NO manipulating string
Algorithms
Containers
Iterator
Back_insert_iterator
function object
struct of function object

===========================

//sample-question.cpp

 
#include <iostream>
#include <list>
#include <iterator>
#include <algorithm>
using namespace std;

int main() {
	list<int> lst<3,2,7,6,8,6,5,5,3,6};

//1
	// delete the last 3 elements of a list
	lst.erase(next(lst.end(), -3), lst.end()); // erase does not accept reverse_iterator; no + because list is not random access
	//use next
	copy(lst.begin(), lst.end(), ostream_iterator<int>(cout, " "));
	cout << endl;

//2
	// delete everything except the last 3 element
	list.erase(lst.begin(), prev(lst.end(), 3));
	copy(lst.begin(), lst.end(), ostream_iterator<int>(cout, " "));
	cout << endl;

//3
	// delete the last 3
	auto it = find(lst.rbegin(), lst.rend(), 3);
	if(it != lst.rend())
		lst.erase((++it).base()); // covert rit to iterator, but position is off by 1

	copy(lst.begin(), lst.end(), ostream_iterator<int>(cout, " "));
	cout << endl;

}



===========================

Review

1 (a) 
	copy(next(v.end(), -5), v.end(), ostream_iterator<int>(cout, " ");
	//better to use next

1 (b)
	copy(v.rbegin(), v.rend(), ostream_iterator<int>(cout, " ");

1 (c)
	copy(lst.begin(), lst.end(), next(v.begin(), 2));

1 (d)
	copy(lst.begin(), lst.end(), inserter(next(v.begin(), 2)));

1 (e)
	sort(v.begin(), v.end(), [](int a, int b) { return a>b; });

1 (f)
	transform(lst.begin(), lst.end(), back_inserter(v),
		[](int n) { return 3*n; });

1 (g)
	v.erase(remove_if(v.begin(), v.end(), [](int n) {return n < 5; }), v.end());

1 (h)
	struct counter {
		size_t count0 = 0, count100 = 0;
		void operator()(int n) {
			if(n < 0)
				count0++;
			else if(n>100)
				count100++;
		}
	};

	counter c = for_each(v.begin(), v.end(), counter());
	cout << c.count0 << ' ' << c.cout100 << endl;

2
	template<typename II, typename OI, typename Pred>
	OI
	copy_if_not(II first, II last, OI result, Pref f) {
		while(first!=last) {
			if(!f(*first))
				*result++ = *first;
				++first;
		}
		return result;
	}


3
	#include <iostream>
	#include <vector>
	#include <utility>
	using namespace std;

	template<typename C,typename Pred>
	pair<C, C>
	partition(const C& c, Pred f) {
		pair<C, C> p;

		for (auto& x: c)
			if(f(x))
				p.first.push_back(x);
			else
				p.second.push_back(x);
		
		return p;
	}	


	int main() {
		vector<int> v{1,2,3};
		auto p = partition(v, [](int n) {return n % 2 == 0; });
		for (auto x: p.second)
			cout << x << ' ';
		cout << endl;
	}

===========================
Week 9
===========================
Midterm Solution

1a

ostream& operator<<(ostream& os, const Student& s) {
	os << s.id << '\n' << s.score.size() << endl;
	for (auto& x : s.scores)
		os << x.course << ' ' << x.score << endl;
	return os;
}

1b 

istream& operator>>(istream& is, Student s) {
	if (!(is >> s.id))
		return is;
	size_t size;
	is >> size;
	s.score.clear();
	CourseScore cs;
	for (size_t i = 0; i < size; i++) {
		is >> cs.course >> cs.score;
		s.score.push_back(cs);
	}
	return is;
}

1c 

struct MaxMinFinder {
	int max = -1, min = 101;
	string course;
	MaxMinFinder(const string& c): course(c) {}
	void operator()(const Student& s) {
		for (auto& x : s.scores) 
			if (x.course == course) {
				if(x.score < min) 
					min = x.score;
				if (x.score > max)
					max = x.score;
			}
	}
};

1d

if (m.max != -1)
	cout << m.max << ' ' << m.min << endl;
else 
	cout << "not found!" << endl;

2a

CourseScoreDist
-course
-map: score -> ids of students with that score

ostream& operator<<(ostream& os, const CourseScoreDist& csd) {
	os << csd.course << endl;
	for (auto& p : csd.score_ids) {}
		os << p.first << ": [";
		for (auto& id : p.second)
			os << id << " ";
		os << "]" << endl;
	}
	return os;
}

2b

CourseScoresDist
calc.score_scores_dist(const vector<Student>& v, const string& course) {
	CourseScoresDist csd;
	csd.course = course;
	for (auto& s : v) 
		for (auto& cs : s.scores)
			if (cs.course == course)
				csd.score_ids[cs.score].insert(s.id);
	return csd;
}

3a

copy(v.rbegin(), next(v.rbegin(), 5), ostream_iterator<int>(cout, " "));

3b 

copy(lst.begin(), next(lst.begin(), 5), back_inserter(v));

3c

transform(v.begin(), v.end(), ostream_iterator(cout, " "), [](int a, int b) { return a + b; });

3d

v.erase(remove_if(v.begin(), v.end, [] (int a) { return a % 5 == 0; }),v.end());


===========================

Vector<bool> // should not use

Specialization of type bool.

// a set of bits
bitset<100> bs;
bs[0] = 0;
bs.set(); // sets all bits to 1
bs.reset(); // set all bits to 0 

Sieve of Eratosthenes

eg. print up to 30

2 ,3, 5, .... 30

Remove all multiples of 2

3, 5 .... 29

Remove Multiples of 3

5 .... 29

Remove all multiples of 5

7 .... 29

Remove all Multiples of 7

... only the prime numbers are left: 2, 3, 5, 7, 11 ... 29

Solution:

bitset<1000000000> // index = number, bit = is_prime

===========================
// sieve.cpp

#include <iostream>
#include <bitset>
#include <cmath>
using namespace std;
#define N 100

bitset<N> isprime; //local array may not work; try global

int main() {
	
	isprime.set();

	for (size_t i = 0; i < sqrt(N); i++) {
		if (isprime[i]) {
			for (size_t j = i; j * i < N; j++)
				isprime[j * i] = 0;
		}

	for (size_t i = 2; i < N; i++)
		if (isprime[i]) {
			++nprimes;
			cout << i << endl;
		}

	cout << nprimes << endl;
}

===========================

//ostream_iterator.cpp

#include <iostream>
#include <iterator>
#include <algorithm>
using namespace std;

// copy;
// while (first != last)
// 		*result++ = *first++;

int main() {
	ostream_iterator<int> 	out(cout, " ");
	/*
	++out;
	out++;
	*out;
	*/
	out = 2;
	out = 3;
	out = 4;
//How do we implement ostream_iterator?
}

===========================

#include <iostream>
#include <iterator>
#include <algorithm>
#include <vector>
using namespace std;

template<typename T>
class Ostream_iterator:	public iterator<output_iterator_tag, T, void, void, void> {
private:
	ostream 	*pos_; //pointer to os
	const char 	*sep_;

public:
	Ostream_iterator(ostream& os, const char *sep = 0): pos_(&os), sep_(sep) {}

	Ostream_iterator&
	operator*() { return *this; }

	Ostream_iterator&				//prefix version
	operator++() { return *this; }
	
	Ostream_iterator&				//postfix version
	operator++(int) { return *this; } // int is not used; int used to distinguished 2 versions of ++

	Ostream_iterator&
	operator=(const T& t) { 
		*pos_ << t;
		if (sep!= 0) 
			*pos_ << sep_;
		return *this;
	}
};

int main() {
	Ostream_iterator<int> out(cout, " ");
	*out++ = 2;
	*out++ = 3;
	*out++ = 4;

	/*
	vector<int> v{3,2,7,6,8};
	copy(v.begin(), v.end(), Ostream_iterator<int>(cout, " "));
	*/
}


What is valuetype?

//example

template<typename Container>
tyename Container::value_type	// typenameX::...
max_nonempty(const Container& c) /*typename here*/ {
	auto max = *c.begin();		// We only have the container type, but we don't know the object type inside
								// Vector<int>::value_type = int
								// value_type is general
	auto it = c.begin();		// Container::const_iterator

	while ()
}

===========================

Associated Types

	Motivation: 

		template<typename Container>
		typename Container::value_type
		max_nonempty(const Container& c) {
			typename Container::const_iterator it = c.begin();
			typename Container::value_type max = *it;

			for (it!=c.end(); ++it)
				if(*it > max)
					max = *it;
			return max;
		}

How do we refer to the type stored in a container of type Container (where Container is a template parameter)?

Solution: Specify a type associated with the container that refers to the type of element it stores.

value_type

eg. within the 

<typename T, ... >
class vector {
...

public:
	typedef T value_type;
	...
};

Other types associated with STL container:

pointer 		// T*
const_pointer	// const T*
reference 		// T&
const_reference // const T&



C++11 Version:

template<typename Container>
auto 						   //-> retrun type
max_nonempty(const Container& c) ->  ??? { 
							   // we can refer to the parameter here; c
	auto it = c.begin();
	auto max = *it;
	/*same code here*/
	return max;
}

decltype(expr) 	// an expression; or variable; basically gives us the type of expr

int n; 		// decltype(n) : int
int& r = n; // decltype(n) : int&

int n = 123;
int& r = n;
auto x = r; // x is an int

If an expression evaluates to a lvalue, decltype gives a reference.

eg. 

decltype(*c.begin()) // WRONG

#include <iterator_traits>	// call remove reference
												  type
typename remove_reference<decltype(*c.begin())>::value

===========================
// max.cpp


#include <iostream>
#include <vector>
using namespace std;

template<typename Container>
auto
max_nonempty(const Container& c) 
    -> typename remove_reference<decltype(*c.begin())>::type {
	auto it = c.begin();
	auto max = *it;

	while (it != c.end()) {
		if (* it > max)
			max = *it;
		++it;
	}
	return max;
}


int main() {
	vector<int> v.{3,2,7,8,5};
	

	//vector<int>::size_type i;
	decltype(v.size()) i;
	for (i = 0; i < v.size(); i++)
		cout << v.[i] << endl;

	cout << max_nonempty(v) << endl;

}


===========================

iterator_traits

	max_nonempty that takes 2 iterators

	template<typename Iterator>
	typename Iterator::value_type
	max_nonempty(Iterator first, Iterator last) {
		auto max = *first;

		while (first != last) {
			if (*first > max)
				max = *first;
			++first;
		}
		return max;
	}

We need to return the object pointed to by the Iterator.

Solution: again use standard associated types.

	value_type

	difference_type

	reference

Problem: max_nonempty doesnt work with regular pointers (arrays). Regular pointers dont have an associated value_type.

Solution: iterator_traits


===========================

#include <iostream>
#include <vector>
using namespace std;

template<typename Iterator>
typename iterator_traits<Iterator>::value_type
max_nonempty(Iterator first, Iterator last) {
	typename iterator_traits<Iterator>::value_type max = *first;
	auto max = *first;

	while (first != last) {
		if (*first > max)
			max = *first;
		++first;
	}
	return max;
}

int main() {
	vector<int> v{3,2,7,8,5};
	cout << max_nonempty(v.begin(), v.end()) << endl;

	int a[] = {3,2,7,8,5};
	cout << max_nonempty(a, a+5) << endl;
}

===========================

typename iterator_traits<Iterator>::value_type
					
	//What is <Iterator>	
	1. vector<int>::Iterator
	2. int*				

iterator_traits is basically defined as follow:

	template<typename Iterator>
	struct iterator_traits {
		typedef typename Iterator::value_type value_type; // Iterator::value_type = associate type
		...
		// value type of the iterator_traits is the same as the value_type of Iterator
	};


class template support full/total & partial specialization.

// int*
template<typename T>
struct iterator_traits<T*> {	// partial specialization
	typedef T value_type;
	...
};


template<typename T, ...>	
class vector {
	...
};

template<...>
class vector<bool> {	// specialization of vector for bool
	...
};


===========================

Template MetaProgramming

Calculate while compiling

//meta.cpp


#include <iostream>

template<size_t N>
struct fact {
	enum { value = N * fact<N-1>::value };
};

template<> // specialization case where N == 0
struct fact<0> {
	enum { value = 1 };
};

template<size_t N>
struct collatz {
	enum { value = collatz<N % 2 == 1 ? 3 * N + 1 : N/2>::value + 1 };
}

template<>
struct collatz<1> {
	enum { value = 0 };
};

template<size_t N, size_t R>
struct rev {
	enum { value = rev<N/10, R*10 + N%10::value };
};

template<size_t R>
struct rev<0, R> {
	enum { value = R };
};

template<size_t N>
struct reverse {
	enum { value = rev<N, 0>::value };
};

template<typename T>
struct remove_star {
	typedef T type;
};

template<typename T>
struct remove_star<T*> {
	typedef typename remove_star<T>::type type;
};

int main() {
	std::cout << fact<6>::value << std::endl;
	std::cout << collatz<27>::value << std::endl;
	std::cout << reverse<12345, 0>::value << std::endl;

	remove_stars<int**>::type n = 1;
}

===========================

3N+1 problem (Collate Conjecture)
//no matter what number youy give this, it will always go to 1

	f(n) = { n/2 if n is even ; 3*n+1 if n is odd }

eg 

	6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 // 8 steps

===========================
Week 10
===========================

iterator_traits:

	make it possible for generic algorithms to work with both regular pointers and iterators

	iterator_traits require certain associated types:

		iterator_cateogry
		value_type
		difference_type
		pointer
		reference

	if we implement our own iterator type, we need to defined these 5 types when using iterator_traits.

	to make it simpler to define these types, the standard library provides a class template (named iterator) that we can inherit from.

e.g. 

template<typename T>
class Ostream_iterator: public iterator<output_iterator, T, void, void> 
{
...
};


===========================

Classes

	3 access specifiers

struct/class B { // B is the base class
public:
	//interface for everyone
protected:
	//interface for subclasses (derivied classes)
private:
	//interface for current class
};


Java VS C++

Java: superclass, subclass, 		method 
		
C++ : base class, derived class,	member function

//inheritance

There are 3 types of inheritance in C++: public, protected, private

class D1: public B {
	...
};

class D2: protected B {
	...
};

class D3: private B {
	...
};


//table
					//type of access
//type of inheritance
				public 			protected 			private
-------------------------------------------------------------------
public			public			protected			NA // not accessible

protected		protected		protected			NA

private			private			private				NA


Everything in the base class is inherited in the derived class, but their access specification may have changed (& they may be hidden).

	Public inheritance models the "is_a_kind_of" relationship.

	Private inheritance can be used as implementation inheritance. // hides


Some common member functions in a class:
(special member functions)

class C {
public :
	~C(); //dtor

	//copy operations
	C(const C&); // copy ctor
	C& operator = (const C&); //copy assignment

	//move operations
	//move is only for C++11
	C(C&&); //move ctor
	C& operator = (C&&); // move assignment
	//default ctor: any ctor that can be called without arguments
};

The compiler can automatically generate these special member function, but there are rules that regulate these automatic generations: 

	The comoiler generates a default ctor only if we dont declare any ctor.

	The generated default ctor "default constructs" the data member of the class. 
	(i.e. calls the default ctor; for primitive types, they are uninitialized)

class declaration
	
	class C;

class definition

	class C {...};	// .h files

class implementation

	Separate file  	// in .cpp and some might be in .h files

===========================

//shapes1

//coloredshape.h

#ifndef COLOREDSHAPE_H
#define COLOREDSHAPE_H
#include <iostream>
#include "GC.h"
//header files should not have: using namespace std;


class ColoredShape {	// ABC (Abstract base class)
						// If a class have at least 1 pure virtual function the class is abstract
						// An abstract class cannot be instantiated
public:
	ColoredShape(const GC::Color& color): color_(color) {}
	inline void 
	ColoredShape::draw() const {
		gc.setColor(color_);
	}
 									// pure virtual function
									// the implementation of a pure virtual function is optional
									// virtual is not repeated
	virtual void save(std::ostream& os) const = 0;

	explicit ColoredShape(std::istream& is) {
		is >> color_;
	}

	virtual ColoredShape *clone() const = 0;

private:
	GC::Color color_;

};

//function defined in header files (& outside of class definition) should be declared inline
inline void 
ColoredShape::save(std::ostream& os) const {
	os << color_ << std::endl;
}

#endif

//circle.h

#ifndef COLOREDCIRCLE_H
#define COLOREDCIRCLE_H
#include <utility>
#include "ColoredShape.h"	// derived class need to include header file of base class 

typedef std::pair<int, int> Point;
class ColoredCircle: public ColoredShape { // public inheritance
public:
	// derived class ctor generally needs to call the corrosponding base class ctor (in the member initializer list)
	explicit ColoredCircle(const Point& centre = Point(0,0), int radius = 1, const GC::Color& color = GC::Color::Default)
	: ColoredShape(color), centre_(centre), radius_(radius) {
		if (radius_ < 0)
			throw 	"ColoredCircle::ColoredCircle(const Point&, int, int): "
					"negative radius not allowed";
	}

	explicit ColoredCircle(std::istream& is) : ColoredShape(is) {
		is >> centre_ >> radius_;
	}

	virtual void draw(GC& gc) const override {
		ColoredShape::draw(gc);
		std::cout  	<< "[C: (" << centre_ << "," << ") "
					<< radius_ << "]" << std::endl; 
	}


	// overriding methods generally need to call the overridden method
	virtual void save(std::ostream& os) const override { 	// use override to catch type; accidently defining totally new method
		os << "ColoredCircle" << std::endl;
		ColoredShape::save(os);		// call base save method; note syntax
		os << centre_  << ' ' << std::endl;
		os << radius_ << std::endl;
	}

	// note: return type can be "slightly" different from base version
	virtual ColoredCircle *clone() const override { 
		return new ColoredCircle(*this); // calls copy ctor
	}

private:
	Point centre_;
	int radius_;

};

#endif

//triangle.h

#ifndef COLOREDTRIANGLE_H
#define COLOREDTRIANGLE_H
#include <utility>
#include "ColoredShape.h"	// derived class need to include header file of base class 

typedef std::pair<int, int> Point;
class ColoredTriangle: public ColoredShape { // public inheritance
public:
	// derived class ctor generally needs to call the corrosponding base class ctor (in the member initializer list)
	explicit ColoredTriangle(	const Point& v1 = Point(0,0), 
								const Point& v2 = Point(1,0),
								const Point& v3 = Point(0,1),
		const GC::Color& color = GC::Color::Default)
	: ColoredShape(color), v1_(v1), v2_(v2), v3_(v3) {
		if (radius_ < 0)
			throw 	"ColoredTriangle::ColoredTriangle(const Point&, int, int): "
					"negative radius not allowed";
	}

	explicit ColoredTriangle(std::istream& is): ColoredShape(is) {
		is >> v1_ >> v2_ >> v3_;
	}

	virtual void draw(GC& gc) const override {
		std::cout  	<< "[T: (" 
					<< v1_ << ' ' << v2_ << ' ' << v3_ << ' ' 
					<< v1_.first << "," << v1_.second << ") "
					<< "(" << v2_.first << "," << v2_.second << ") "
					<< "(" << v3_.first << "," << v3_.second << ") "
					<< "]" << std::endl; 
	}


	// overriding methods generally need to call the overridden method
	virtual void save(std::ostream& os) const override { 	// use override to catch type; accidently defining totally new method
		os << "Coloredtriangle" << std::endl;
		ColoredShape::save(os);		// call base save method; note syntax
		os << v1_ << ' ' << std::endl;
		os << v2_ << ' ' << std::endl;
		os << v3_ << ' ' << std::endl;
	}

	virtual ColoredTriangle *clone() const override {
		return new ColoredTriangle(*this);
	}

private:
	std::string to_str() const {
		std::ostringstream oss;
		oss << "[T:"
	}
	Point v1_, v2_, v3_;

};

#endif

//Point.h

#ifndef POINT_H
#define POINT_H
#include <iostream>

class Point {
public:
	explicit Point(int x = 0, int y = 0): x_(x), y_(y) {}
	friend std::ostream& operator<<(std::ostream& os, const Point& p);
	friend std::istream& operator>>(std::istream& is, Point& p);
private:
	int x_, y_;
};

std::ostream&
operator<<(std::ostream& os, const Point& p) {
	return os << "(" << p.x_ << "," << p.y_ << ")";
}

std::istream&
operator>>(std::istream& is, Point& p) {
	char c1, c2, c3;
	return is >> c1 >> p.x_ >> c2 >> p.y_ >> c3;
}

#endif

//ColoredSHapeFactory.h
#ifndef COLOREDSHAPEFACTORY_H
#define COLOREDSHAPEFACTORY_H

#include <iostream>
#include <string>
#include "ColoredCircle.h"
#include "ColoredTriangle.h"

class ColoredShapeFactory {
public:
	explicit ColoredShapeFactory(std::istream& is): isp_(&is) {}
	ColoredShape *create() {
		std::string type;

		if(*isp_ >> type) {
			if (type == "ColoredCircle")
				return new ColoredCircle(cin);
			if (type == "ColoredTriangle")
				return ColoredTriangle(cin);
		}
		return 0;
	}
private:
	std::istream *isp_; //is_pointer 
};

#endif


//graphic context.h
#ifndef GC_H
#define GC_H
// graphics context
#include <iostream>


class GC {
public:
	enum class Color { Default, Red, Blue, Green };	// C++11 (scope enumerators)
	explicit GC(std::ostream& os): osp_(&os) {}
	void setColor(const Color& color) {
		*osp_ << colorMap_[color];
	}


	~GC() { *osp_ << defaultColor_; }

	GC(const GC&) = delete; // disable the copy ctor

	inline std::ostream&
	operator<<(std::ostream& os, const GC::Color& color) {
		return os << static_cast<int>(color);
	}

	inline std::istream&
	operator>>(std::istream& is, GC::Color& color) {
		int c;
		is >> c;
		color = static_cast<GC::Color>(c);
		return is;
	}


private:
	std::ostream *osp_;
	static std::map<Color,string> colorMap_; 
	static  constexpr char *defaultColor_ = "red";
};

#endif

//main.cpp

#include <iostream>
#include <vector>
#include "Point.h"
#include "ColoredTriangle"
#include "ColoredCircle.h"
#include "ColoredShape.h"

using namespace std;

int main() {
	vector<ColoredShape*> v;
	v.push_back(new ColoredCircle(Point(1,2), 3, GC::Color::Red));
	v.push_back(new ColoredTriangle());
	v.push_back(new ColoredCircle(Point(2,6), 5, GC::Color::Green));

	for(auto p : v)
		p->save(cout);


	
	//ColoredCircle c;
/*
	try {
		ColoredCircle c(Point(0,0), -1);		// crashes
		c.draw();
		c.save(cout);
	} catch (const char *s) {
		cerr << s << endl;
	}
*/

	//ColoredCircle c;
	//while (cin >> c)
	//	v.push_back(c);


}

//main2.cpp

#include <iostream>
#include <vector>
#include "GC.h"
#include "ColoredShape.h"
#include "ColoredShapeFactory.h"
using namespace std;

int main() {
	vector<ColoredShape*> v;
	ColoredShapeFactory sf(cin);
	ColoredShape *p;
	GC gc(cout);

	while (p = sf.create() != 0) //not null
		v.push_back(p);

	for (auto p : v)
		p->draw(gc);
}

//GC.cpp

#include "GC.h"
using namespace std;

// Static members must be initialied in .cpp file
// note: static keyword is not repeated
// type  class::name

map<GC::Color, string> GC::colorMap_ = {
	{Color::Default, "1"},
	{Color::Red, "2"},
	{Color::Blue, "3"},
	{Color::Green, "4"}
};

// save output to data file and recreate the coloredshape

//main3.cpp

#include <vector>
#include "ColoredCircle.h"
#include "ColoredShape.h"
#include "ColoredTriangle.h"
#include "GC.h"
using namespace std;

int get_choice() {
	int n;

	// not a good version; should istringstream and getline
	while(1) {
		cout << "Enter a choice: ";
		if(!(cin >> n))
			break;
		if(n == 0 || n == 1)
			return n;
		cout << "Invalid choice" << endl;
	}
	return -1;
}

void draw(const vector<ColoredShape*>& v, GC& gc) {
	for (auto p: v)
		p->draw(gc);
}

int main() {
	ColoredCircle c;
	ColoredTriangle t;
	ColoredShape *shapes[] = {&c, &t};
	vector<ColoredShape*> v;
	GC gc(cout);
	int choice;

	while ((choice = get_choice()) != -1) {
		v.push_back(shapes[choice]->clone());
		draw(v, gc);
	}

	// free up memory
	for (auto p: v)  
		delete p;
}

===========================

//Any ctor that takes 1 argument can automatically be involved by the compiler to perform a conversion unless the ctor is declared 'explicit'

//explicit.cpp

struct S {
	explicit S(int n): m(n) {}
	int m;
};

bool operator==(const S& lhs, const S& rhs) {
	return lhs.m == rhs.m;
}

int main() {
	S s(1);
	//s == 1;	// OK, because compiler calls the ctor to create a s object from 1; unless the ctor is declared explicit

	s == S(1);	// OK, compiles when explicit.

	s == (S)1;	// OK, cast is exactly the same as calling the ctor.

	S s2(1);	// direct initialization
	S s3 = 1;	// copy initialization (doesn't work if ctor is explicit)
} // any ctor that can be called with 1 argument


===========================


enum Color { Black, Red, Blue }; // black is default 0, ... 1... 2... etc

int main() {
	Color color = Black;
}

===========================
Week 11
===========================

Special member functions:

	default ctor

		compiler only generates default ctor if there are no ctors at all.

	// copy operations
	copy ctor

		copy ctor declares this if we dont declare it ourself.
		C(const C&);
		C& operator = (const C&);

	copy assignment

		copy assignment declares this if we dont declare it ourself.

	// move operations

	move ctor
	move assignment

		Not independent; compilerwill not declare one if we explicitly declare the other.
		Furthermore, if we declare our own copy operation the compiler will not generate the move operations.
		Conversely, if we declare our own move oepration, the compiler generated copy operations are deleted.
		If we declare our own dtor, the compiler will not generate the move operations.

	dtor

//generate copy ctor
C(const C&) = default;

//disable ctor
C(C&&) = delete;

prototype=default;
prototype=delete;

The compiler-generated copy-ctor calls the copy ctor for each data member. (Memberwise copy)
If inheritance the copy ctors of the base classes & then ...

class A: public B, public C public D {...};

compiler-gernated dtor: ~C(){} // dont need to explicitly call dtor
	e.g. ~A(){} //calls dtor for all datamembers: B, C, D



===========================

virtual 

	C++ has both early and late binding

	x.f(...); // which f() to choose if multiple

	In early binding, the compiler descides at compile time when method is involved.

Student s = new PTStudent(...);
bool b = s.fails("COMP3512"); 	// for Java, PTStudent's fail() is used.

	In late binding the compiler generates code that determines at run-time which method is involked.

Student *p = new PTStudent(...);
if(p->fails(...)) ... ;
p = new FTStudent(...);
if(p->fails(...)) ... ;

 	Late binding is needed if we want to switch from PT to FTs function. We need to determine at runtime which method is involked.

Late binding only occurs when a virtual method is involked through a pointer or a reference.
Under public inheritance, a base reference can refer to a derivied object & a base pointer can point to a derived object.



PTStudent pts;
pst.fails(...); //late binding not needed

Student& r = pts;
r.fails(...); // late binding needed; public inheritance models after is-a type of relationship; PTStudnt is a kind of Student

Student s = pts; // extra data-member will be sliced off.

//coloredshape class
virtual ~C(){}  //generally, a class we want to inherit from should have a virtual dtor.

B - base
D - Derived

B *p = new D(...);
delete p; // which dtor is called? 

	We want ~D() to be called; therefore, we need to declare dtor to be virtual.

Example: Name class

#ifndef...
#define...
#include <string>

class Name {
public: 
	explicit Name (const std::string& first = "john", const std::string& last="doe"): // compiler generated copy ctor, copy assignment, dtor, move ctor, move assignment
		first_(first), last_(last) {
			if(!isValid(first_)) || !isValid(last_))
				throw "...";
		}

	std:string 	getfirst() const { return first_; };
		 		getlast() ...
	bool setfirst(const std::string& first) {
		if(!isValid(first))
			return false;
		first_ = first;
		return true;
	}

	... setlast() ...

	//friend declaration

	inline std::ostream& operator<<(std::ostream& os, const Name& n) {
		return os << n.first_ << n.last_;
	}

	inline std::istream& 
	operator>>(std::istream& is, Name& n) {

	}

	weak guarantee: system is still in a consistent state

	string guarantee: system is unchanged
	
	no-fail

	original: homer simpson
	user: bart
	bart simpson, valid name, but changed, so weak guarantee.

	friend bool operator==(const Name&, const Name&);
	friend bool operator<(const Name&, const Name&);

private:
	std::string first_, last_;

	static bool isValid(const std::string& name) {
		return ...
	}

};

inline std::ostream&
operator<<(std::ostream& os, const Name& n) {
	return os << n.first_ << ' ' << n.last_;
}

inline std::istream&
operator>>(std::isream& is, Name& n) {
	std::string first, last;

	if(is >> first >> last && Name::isValid(first) &&  Name::isValid(last)) {
		n.first_ = first;
		n.last_ = last;
	} else {
		is.setstate(std::ios_base::failbit);
	}
	return is;
}


inline bool
operator==(const Name& lhs, const Name& rhs) {
	return lhs.first_ == rhs.first_ && lhs.last_ == rhs.last_;
}

intline bool
operator<(const Name& lhs, const Name& rhs) {
	return lhs.last_ < rhs.last_ || (lhs.last_ == rhs.last_ && lhs.first_ < rhs.first_);
}

intline bool
operator!=(const Name& lhs, const Name& rhs) {
	return !(rhs == lhs);
}

intline bool
operator!=(const Name& lhs, const Name& rhs) {
	return lhs < rhs || lhs == rhs;
}

intline bool
operator>=(const Name& lhs, const Name& rhs) {
	return !(lhs < rhs);
}

intline bool
operator>(const Name& lhs, const Name& rhs) {
	return rhs < lhs;
}

#endif


===========================
#include <iostream>
#include "Name.h"
#include <vector>
using namespace std;

int main() {
/*
	try {
		Name n1("homer", "simpson"), n2("r2d2", "simpson");
	} catch (const char *s) {
		cerr << s << endl;
	}
*/

	Name n;
	vector<Name> v;
	while (cin >> n) {
		v.push_back(n);
	}

	for(auto& n: v) {
		cout << n << endl;
	}



}

===========================

//employee.h

#ifndef EMPLOYEE_H
#define EMPLOYEE_H
#include <string>
#include <tuple>
#include "Name.h"
#include "Date.h"

class Employee {

public:
	explicit Employee(const std::string& id = "A12345678", const Name& name = Name(), const Date& birthdate = Date()): id_(id), name_(name), birthdate_(birthdate) {
		// validation
		count_++;
	}

	Employee(const Employee& src): id_(src.id_), name_(src.name_), birthdate_(sec.birthdate_) { //copy
		count++;
	}

	virtual ~Employee() { count_--;}

	Employee& operator=(const Employee& src) = default; //copy_assignment prototype

	Employee(Employee&& src): id_(std::move(src.id_)), name_(std::move(src.name_)), birthdate_(std::move(src.birthdate_)) { //move ctor
		count_++;
	}

	Employee& operator=(Employee&& src) = default; //move assignment 


	friend std::ostream& operator<<(std::ostream& os, const Employee& e);
	friend std::istream& operator>>(std::istream& is, const Employee& e);

	virtual void print(std::ostream& os) const {
		os << "ID: " << id_ << std::endl 
			<< "Name" << name_  << std::endl 
			<< "Birthdate" << birthdate_ << std::endl;
	}
private:
	std::string id_;
	std::string name_;
	Date birthdate_;
	static size_t count_; //declaration only; must be defined in cpp file

};

inline friend std::ostream& 
operator<<(std::ostream& os, const Employee& e) {
	os << ie.d_ << ' ' << e.name_ << ' ' << e.birthdate_;
}

inline std::istream& 
operator>>(std::istream& is, Employee& e) {
	std::string id;
	Name name;
	Date birthdate;

	if(is >> id >> name >> birthdate) {
		e.id_ = id, e.name_ = name, e.birthdate_ = birthdate;
	} else {
		is.setstate(std::ios_base::failbit);
	}
	return is;
}

//cpp

#include "Employee.h"

size_t Employee::count_ = 0; // definition of count_

Employee::Employee(const Employee& src): id_(src.id_), name_(src.name_), birthdate_(sec.birthdate_) { //copy
	count++;
}

Employee::Employee(Employee&& src): id_(std::move(src.id_)), name_(std::move(src.name_)), birthdate_(std::move(src.birthdate_)) { //move ctor
	count_++;
}




===========================
Week 12
===========================
Casting

4 types of cast:

	1. const_cast //specialized uses

	2. dynamic_cast //specialized uses

	3. reinterpret_cast //specialized uses

	4. statis_cast


const_cast

	Typically used to cast away const-ness

	Can be used to cast something to const but ususally the cast is not necessary.

		eg. vector<int> v{...};

		const vector<int>& r = const_cast<const vector<int>&>(v); // cast is not necessary

		const vector<int>& r = v; // already works

	Note: the target type must be a Pointer or a Reference.

		void print(C& c) {...};
		const C c = ...;
		print(c); // doesn't compile
		print(const_cast<C&>(c));

		However, if print tires to modify c, the behavior is undefined.



	const_cast<T*>(p); 

		T = target type, the object that we want to cast to

	dynamic_cast<T*>(p);

	static_cast<int>(x);

dynamic_cast

	Typically used to cast donw inheritance hierchy

	Can also be used to cast up the inheritance hierarchy but in cases the cast is not necessary.

	Public inheritance - models the is-a-kind-of relationship.

		B - base class; D - derived class

	A base reference can refer to a derived object. // same for pointer

		B b; 
		D d;
		B& r = d;	// OK
		B* p = &d; // OK
		B& r = dynamic_cast<B&>(d);

		Note - Target type must be a reference or a pointer.

			Furthermore, the classes must be polymorphic. 

			A class is polymorphic if it at least have 1 virtual function (method).

		A *p = new... // new A; new B; new C

		B *q = dynamic_cast<B*>(p); //cast down from A to B

		if(q == nullptr) { //or 0 = cast fails
			//...
		}
		else { // p points to a B or a C; a kind of B object

		}

		A& r = ... ;
		try {
			C& rc = dynamic_cast<C&>(r); // rc is not a pointer, so throw exception
			//use rc
		} catch (const bad_cast& e) {
			cerr << e.what() << endl;
		}

		Dont overuse dynamic_cast

			void f(A *p) {
				C *pc = dynamic_cast<C*>(p);
				if(pc != nullptr) {
					//...
				} else {
					B *pb = dynamic_cast<B*>(p);
					if(pb != nullptr) {
						//...
					} else {
						//...
					}
				} 
			}

			//not a good  design; overused; just create a new method

			p->g(...); // make use of polymorphism, use virtual methods instead

reinterpret_cast

	low level & non-portable

		eg. char *p = reinterpret_cast<char*>(0x8000);

static_cast //general cast

	Cannot cast away const

	eg.  int *p = static_cast<int*>(malloc(100*sizeof(int))); // need cast because c++ has stricter type checking than C

===========================

Static members

	Static members are associated with a class not with individual object.

		//classname::membername 

	static data members are declared within the class definition; they must be defined and initialized in a capp file.

		1 exception - if the static member is a const& of integral type, we can initalize it inside the class definition. If we are not using the address of this static member we can omit the definition (in a cpp file).

===========================

//hell.cpp

class Hell {

private: 
	const static size_t number_of_souls = 1_000_000_000; // instead of MACRO
	unsigned long lost_souls[number_of_souls];
};

===========================

ctors

	Constructor should always use member initializer.

	Any data member not explicitly initalized in the member initializer list is initalized automatically via the default ctor.

//ctor.cpp

struct A {
	int n_;
	A(int n): n_(n) {}
	A() = default;
	A& operator(const A& src) { n_ = src.n_; return *this; }
};

struct B {
	A a_;
	B(A& a): a_(a) {} // compiles
	B(A& a) { a_ = a; } // doesn't compile; compiler calls default ctor of A
};

int main() {
	A a(1)
	B b(a);
}

===========================

RTTI (runtime type information);

#include <typeinfo> //

	This defined a type named type_info

	A type_info object can only be created by using the typeid operator. 

		type_info t = typeid(x); // doesn't compile
		// x = some object

		// all ctors are private (or deleted)

		// typeid(x) calls the copy ctor

		type_info& t = typeid(x); // doesn't compile

	const type_info& t = typeid(x); // OK

We can compare type_info object

	Note: typeid(T&) = equals typeid(T)

By comparing type_info object we can find out the type of an object.  

This is typically used with classes under inheritance. The classes involved must be polymorphic.

	In order for typeid to retrieve the derived type; it must be applied to an object or a refernece.

	B -> A 

		A *p = new B;
		typeid(p)==typeid(B*); // false
		typeid(*p)==typeid(B); // true

		B b;
		A& r = b;
		typeid(r) == typeid(B); // true

	type_info has a name(); method that returns a C-style string describing the type. 
	
		typeid().name(); // non portable string result 

===========================

In ColoredCircle, we do not need to define the base class.

#include <typeinfo>

inline void
ColoredShape::save(std::ostream& os) const {
	os << typeid(*this).name() << std::endl;
}

===========================

//implement class and subclass will be on final

//FullTimeEmployee.h

#ifndef FULLTIMEEMPLOYEE_H
#define FULLTIMEEMPLOYEE_H
#include "Employee.h"

size_t FullTimeEmployee::count_ = 0;

class FullTimeEmployee: public Employee {
public:
	explicit
	FullTimeEmployee(const std::string& id = "A12345678",
					 const Name& name = Name(),
					 const Date& birthdate = Date(),
					 float salary = 0);

	FullTimeEmployee(const FullTimeEmployee& s); //copy ctor

	FullTimeEmployee(FullTimeEmployee&& src); // move ctor

	virtual ~FullTimeEmployee() { count_--; }

	friend std::ostream& operator<<(std::ostream& os, const FullTimeEmployee& e);
	friend std::istream& operator>>(std::ostream& os, FullTimeEmployee& e);

private:
	float salary_;
	static size_t count_;
};
#endif

//FullTimeEmployee.cpp

#include "FullTimeEmployee.h"
using namespace std;

//explicit, virtual, default args not repeated here
FullTimeEmployee::FullTimeEmployee(const string& id,
					 const Name& name,
					 const Date& birthdate,
					 float salary) : Employee(id, name, birthdate), salary_(salary) { // call base ctor

	if(salary_ < 0)
		throw "...";
	count_++;
}

FullTimeEmployee::FullTimeEmployee(const FullTimeEmployee& src)
: Employee(src), salary_(src.salary_) {
	count_++;
}

FullTimeEmployee::FullTimeEmployee(FullTimeEmployee&& src)
: Employee(move(src)), salary_(move(src.salary_)),  { // move is like a cast
	count_++;
}

/* copy assignment (not really necessary as compiler-generated version is ok) */

FullTimeEmployee&
FullTimeEmployee::operator=(const FullTimeEMployee& src) {
	if(this != &src) { // not same address; not same object
		Employee::operator=(src); // this->Employee::operator=(src);
		salary_ = src.salary_; // this->sallary_ = src.salary_;
	}
	return *this;
}

FullTimeEmployee&
FullTimeEmployee::operator=(FullTimeEmployee&& src) {
	if(this != &src) {
		Employee::operator=(move(src));
		salary_ = move(src.salary_);
	}
	return *this;
}

ostream& operator<<(ostream& os, const FullTimeEmployee& e) {
	return os << (const Employee&) e << ' ' << e.salary_; // note cast
}

istream& operator>>(ostream& os, FullTimeEmployee& e) {
	//return is >> (Employee&) e >> e.salary_;
	Employee tmp;
	float salary;
	if(is >> tmp >> salary && salary >= 0)  {
		(Employee&) e = tmp; // or: e.Employee::operator=(tmp);
		e.salary_ = salary;
	} else {
		is.setstate(ios_base::failbit);
	}

	return is;
}

void FullTimeEmployee::print(std::ostream& os) const {
	Employee::print(os);
	os << "Salary:" << salary_ << endl;
}
 

//date.h
#ifndef DATE_H
#define DATE_H
#include <iostream>
class Date {
public:

	Date(int year = 2000, int month = 1, int day = 1)
	: year_(year), month_(month), day_(day) {
		if(!isValid(year_, month_, day_)) {
			throw "Date::Date(int, int, int): invalid date";
		}
	}

	static bool isValid(int year, int month, int day) {
		return true;
	}

	friend std::ostream& operator<<(std::ostream& os, const Date& d);
	friend std::istream& operator>>(std::ostream& os, Date& d);

private:
	int year_, month_, day_;
}

inline std::ostream& 
operator<<(std::ostream& os, const Date& d) {
	return os << d.year_ << '/' << d.month_ << '/' << d.day_;
}

inline std::istream& 
operator>>(std::ostream& os, Date& d) {
	int year, month, day;
	char c1, c2;
	if(is >> year >> c1 >> month >> c2 >> day && c1 == '/' && c2 == '/' && Date::isValid(year,month,day))
		d.year_ = year, d.month_ = month, d.day_ = day;
	else 
		is.setstate(std::ios_base::failbit); //
	return is;
}

#endif

//main.cpp

#include <iostream>
#include <vector>
#include "FullTimeEmployee.h"
using namespace std;

int main() {
	vector<Employee*> v;

	v.push_back(new Employee);
	v.push_back(new FullTimeEmployee);

	for(auto& e: v)
		e->print(cout); 
}

===========================
Week 13
===========================

Multiple inheritance

	Unlike Java, C++ can inherit from multiple classes

eg. 

	class C: public A, public B { ... };

	Problem: if 2 parents share same prototype

	Compiler cannot figure out which function to call.

class A {
	void f();
	void g();
}

class B {
	void f();
	void g(int);
}


c.A::f(); // calls A::f()
c.B::f(); // calls B::f()

c.g(1); // does not compile; void g(int) & void g() are hidden

Everything in the base calsss in inherited in the derived class but they may be inaccessable or hidden.

class B {
public:
	virtual void f();
	...
};

class D: public B {
public:
	void f(int);
};

D d;
d.f(); // doesnt compile inherited f() is hidden by f(int)

c.B::g(1); // OK
c.A::g(); // OK

A <--- B C <--- D

A has int a;

Will there be 2 copies of a? Yes, unless we use virtual inheritance.

class A { ... };

class B: public virtual A { ... };

class C: public virtual A { ... };

class D: public D, public C { ... };

===========================

class A {
public:
	A(int a):a_(a) {}
private:
	int a_;
};

class B: public virtual A {
public:
	B(int a):A(a) {}
};

class C: public virtual A {
public:
	C(int a): A(a) {}
};

class D: public D, public C {
public:
	//D(int a):B(a), C(a) {} // is A initialized twice?? NO; A is not actually initialized. 
	D(int a): A(a), B(a), C(a) {} // need to explicitly call A's ctor
};

===========================

Exceptions

When an exception is thrown and caught, the stack starts to unwind. Objects will be destroyed.

D destroyed. 
C destroyed.
B destoryed.
A destoryed.

Order of dtor calls in the example: ~D(), ~C(), ~B(), ~A()

void f() {
	A a;
	g();
}

void g() {
	B b;
	C c;
	h();
}

void h() {
	D d;
	throw 1;
}

int main() {
	try {
		f();
	} catch (...) { // catch all possible is "..."
		...
	}
}

try/catch

try {
	f();
} catch (int n) {
	...
} catch (long l) { // called when 134513245345235235; exact match
	...
} catch (short s) {
	...
}

The matching of exception objects is stricter than that used in function overload resolution or function matching.

void f() {
	throw 134513245345235235; // long
}

The first catch clauses that matches is the one that is used.


A <- B <- C

void f() {
	throw C();
}

try {
	f();
} catch (const A& e) { //catches because C is a kinf of A
	...
}

try {
	f();
} catch (const C& e) { // catch most specific type first
	...
} catch (const B& e) {
	...
} catch (const C& e) {
	...
}

===========================

A copy of the exception object is thrown.

	void f() {
		thow A(); // a copy of the A object is throw
	}

Catch exception by reference to reduce copying.

	try {
		f();
	} catch (const A& a) { // better version; no copying when it is caught
		...
	}

Rethrow an exception

void h() {
	try {
		g();
	} catch (const A& a) {
		// fully handle exception
	}
}

void g() {
	try {
		f();
	} catch(const A& a) {
		// partially handle exception
		throw; // rethrow exception
	}
}

throw; vs throw a;

throw a; // throws a copy of a!!

throw; // rethrows the same exception; no copy is made.


dtors should not throw exceptions.

	if an exception is throw when another exception is active, the program terminates.

===========================

//ctor2.cpp

struct A {
	A() { cerr "A()" << endl; } // ctor
	A(const A& src) { cerr << "A(const A&" << endl; } // copy
	A& operator=(const A& src) {
		cerr << "A::operator=" << endl;
		return *this;
	}
	~A() { cerr << "~A()" << endl; }
};



int main() {
	A a1;					// default ctor
	A a2[3];				// default ctor 3 times
	A a3(a1);				// copy ctor
	A a4 = a1;				// copy ctor	
	a1 = a4; 				// copy assignment 
	A *p1 = new A;			// default ctor; dynamically allocated can be deleted 
	A *p2 = new A(a4);		// copy ctor; dynamic and can be deleted
	delete p1;				// dtor
	delete p2;				// dtor
}

// dtor is called when out of scope.

===========================

struct A {
	A() { cerr "A()" << endl; } // ctor
	A(const A& src) { cerr << "A(const A&" << endl; } // copy
	A& operator=(const A& src) {
		cerr << "A::operator=" << endl;
		return *this;
	}
	~A() { cerr << "~A()" << endl; }
};

struct B {
	B() { cerr << "B()" << endl; } // ctor
	B(const B& src): a_(src.a_) { cerr << "B(const B&" << endl; } // copy
	B& operator=(const B& src) {
		a_ = src.a_;
		cerr << "B::operator=" << endl;
		return *this;
	}
	~B() { cerr << "~B()" << endl; }

	A a_; // B contains an A
};

struct C: public B {
	C() { cerr "C()" << endl; } // ctor
	C(const C& src): B(src) { cerr << "C(const C&" << endl; } // copy
	C& operator=(const C& src) {
		B::operator=(src);
		cerr << "C::operator=" << endl;
		return *this;
	}
	~C() { cerr << "~C()" << endl; }
};

// anything not initialized in the member initializer list is automatically initialized by the default ctor

int main() {
/*
	A a1;					// default ctor
	A a2[3];				// default ctor 3 times
	A a3(a1);				// copy ctor
	A a4 = a1;				// copy ctor	
	a1 = a4; 				// copy assignment 
	A *p1 = new A;			// default ctor; dynamically allocated can be deleted 
	A *p2 = new A(a4);		// copy ctor; dynamic and can be deleted
	delete p1;				// dtor
	delete p2;				// dtor
*/
/*
	C c1; 
	cerr << "***" << endl;
	C c2(c1); // 
	cerr << "***" << endl;
	C c3 = c2;
	cerr << "***" << endl;
	c3 = c1;
	cerr << "***" << endl;
*/
/*
	B b1;
	cerr << "***" << endl;
	B b2(b1);
	cerr << "***" << endl;
	b1 = b2;	
	cerr << "***" << endl;
*/

	B b1;
	

}


// dtor is called when out of scope.

===========================
Last Week
===========================

Pointer to member function

Member function is a method.

===========================

#include <iostream>
#include <functional>
using namespace std;


struct B {
	int n_;
	B(int n = 0): n_(n) {}
	void inc(int m = 0) { n_ += m; }
	virtual void print() const { cout << "B::print()" << endl; }
	virtual void print(ostream& os) const { cout << "B::print(ostream&)" << endl; }
};

struct D: public B {
	D(int n = 0): B(n) {}
	virtual void print() const { cout << "D::print()" << endl; }
	virtual void print(ostream& os) const { cout << "D::print(ostream&)" << endl; }
};

int main() {
	auto inc = &B::inc; // address of member function
	B b;
	b.*inc)(3);
	cout << b.n_ << endl;

	void (B::*print)() const print = &B::print; // right left rule, print in a pinter to a member of B that returns nothing
	(b.*print)();

	D d;
	(d.*print)();

	B& r = b;
	(r.*print)();

	B *p = new D;
	(p->*print)();

	auto F = mem_fn(print);
	f(b);	
	f(d);
	f(p); // automatically dereference a pointer

	auto i = mem_fn(&B::inc);
	i(b, 3);
	cout << b.n << endl;
	auto pr0 = mem_fn<void() const>(&B::print);
	pr0(b);

}

vtable - virtual table

	Class make slots avail in vtable, points to the overriding version

	Slots are pointed to the virtual methods.

	Go to the vtable and call vtable[1](...)



Typedef 

	typedef void (B::*ptrMemFn)() const;
	ptrMemFn print = &B::print;

mem_fn

	Converts a method to a function.

i(b,3) ---> b.inc(3);

===========================

//bind2.cpp

#include <iostream>
#include <functional>
using namespace std;
using namespace std::placeholders;

int f(int a, int b) {
	return a / b;
}

int main() {
	f(1,2);
	auto g = bind(f, _1, 2); // _1 is the first argument of g
	auto h = bind(f, 4, _1);
	cout << g(12,2,3,4) << endl; // extra arguments are ignored
	cout << h(2) << endl;
}

	// _1 gets the argument 12 and 2

===========================

Special functions

-dtors can be virtual
-ctor cannot be virtual
	The prototype pattern simulates a virtual copy ctor.
-assignment operator are not virtual.
	B& operator = (const B&);
	D& operator = (const D&);
		Virtual are ment to be overridden.

===========================

B - base
D - derived

B *p = new D;

delete p;

ctors

virtual means late binding.

Early binding determined at compile time.

Late binding is determined after compile time.

class B {
public: 
	void f();
	virtual void g();
};

class D: public B {
public:
	void f();
	virtual void g();
};

B *p = new D;
p-> f(); // early binding, calls B::f()
p-> g(); // late binding, calls D::g()

===========================

Early and late binding.

Early Binding

	In early binding, compiler determines at compile time which method is going to be invoked

Late Binding
	
	In late binding, compiler generates code that determines at runtime which method is invoked.

In C++ late binding is used when virtual method is invoked through a pointer or a reference.


===========================

Static type vs dynamic type

	Static type = declared type.

	Dynamic type = actual type. // can change

B *p = new D; // p can change; static type is a B* (declared type); dynamic type = D*
B b; 	
p = &b; // static type = B*; dynamic type = B*

D d;
B& r = d; // r's static type = B; dynamic type = D

Early binding always uses static type.

Late binding always use dynamic type.

//the steps to figure out which method is invoked.

1. the compiler only looks at static type.
	It looks in the class corrosponding to the static type of the "object" (object can be a pointer) for the method we want to call.
2. If the method is virtual & we are calling it through a pointer or a reference, the compiler descides to use late binding; otherwise it uses late binding.
3. In late binding, compiler generates code that determines at runtime by looking at the dynamic type which method is invoked.
4. Everything in the base class is inherited in the derived class, but they may be inaccessible or hidden.
5. Default arguments & access control are determined at compile time, not at runtime. 

class B {
public: 
	void f();
	virtual void g();
	// no h()
	virtual void k();
	void l();
	virtual void m();
	virtual void n();
	virtual void r(int=0)
	virtual void s(int=0)
	virtual void t();
};

class D: public B {
public:
	void f();
	virtual void g();
	virtual void h();
	// no k()
	virtual void l();
	// no m
	virtual void n(int); // hides inherited n()
	virtual void r(int=1)
	virtual void s();
private:
	virtual void t();
};

B *p = new D;
p->f(); // looks in static type, which is B; early binding: B::f()
p->h(); // doesnt compile, looks in B for h();
p->g(); // virtual, late binding; calls the overriding version D::g()
p->k(); // compiles late binding, calls B::k() (no overriding version)
p->l(); // early binding, calls B::l()

B *q = new D;

q->m(); // looks in D for m(); see inherited m(); calls B::m()
q->n(); // inherited n() is hidden by n(int); doesnt compile
p->r(); // calls D::r(0)
	compiler rewrites to p->r(0)
p->s();
	rewritten to s->s(0), calls B::s(0)
p->t(); // compiles on public t(); after calls D::t() 



determine if it compiles or not, which class to look for method, static only

once it compiles, figure out early or late 

early is easy, but late we need to look at dynamic type, and invoke the method that corrosponds to the type


===========================

Final

	which ctor calls which ctor 

	early or late binding

	Implement class, and derived class (last 2 labs)

	ShapeFactory 

	Review exercise

===========================

//main2.cpp


#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
#include "GC.h"
#include "ColoredShape.h"
#include "ColoredShapeFactory.h"
using namespace std;
using namespace std::placeholders;

int main() {
	vector<ColoredShape*> v;
	ColoredShapeFactory sf(cin);
	ColoredShape *p;
	GC gc(cout);

	while (p = sf.create() != 0) //not null
		v.push_back(p);

	//for (auto p : v)
	//	p->draw(gc);

	// note: arguments to bind are passed by value.
	for_each(v.begin(), v.end(), 
		bind(mem_fn(&ColorShape::draw), _1, ref(gc))); 


}

function vs method 

===========================

// unique_ptr.cpp

// Smart pointer

	// unique pointers cannot be copied // move only semetics.

	//Only 1 unique pointer owns the object, so it can delete while the other cannot.

#include <memory>

unique_ptr<int> r(q); // doesnt compile
unique_ptr<int> r(move(q)); // OK, moves the ownership from q to r; q becomes null 
unique_ptr<int> p(nullptr), q(new int(5));

shared_ptr: uses reference count

// eg. ColoredShapeFactory


	#include <memory>

	class ColoredShapeFactory ... {
		std::unique_ptr<ColoredShape> create() {
			std::string type;
			std::unique_ptr<ColoredShape> p(nullptr);
		}
	}

===========================

// String.h
#include <iostream>
#include <cstring>


class String {
private:
	char *s_;

public:
	typedef char *iterator;
	typedef const char *iterator;

	String(const char *s): s_(new char[strlen(s) + 1]) { // add 1 for null character
		strcpy(s_, s);
	}

	String(const String& src): s_(new char[strlen(src.s_) + 1]) {
		strcpy(s_, src.s_);
	}

	~String() { delete [] s_; }
/*
	String& operator=(const String& src) {
		if(&src != this)  { // if address of src is not same as current
			char *tmp = new char[strlen(src.s_) + 1];
			strcpy(s_, src.s_);
			delete [] s_;
			s_ = tmp;
		}
		return *this;
	}
*/
	void swap(String& other) {
		std::swap(s_, other.s_);
	}

	String& operator=(const String& src) {
		String tmp(src);
		swap(tmp);
		return *this;
	}

	iterator begin() { return s_; }

	iterator end() { return s_ + strlen(s_); }

	friend std::ostream&
	operator<<(std::ostream& os, const String& s);


};

std::ostream&
operator<<(std::ostream& os, const String& s) {
	return os << s.s_;
}


#include "String.h"
#include <iostream>
using namespace std;

int main() {
	String s("hello"), s2("goodbye");
	cout << s << endl;
	s = s2;
	cout << s << endl;

	for(auto it = s.begin(); it != s.end(); it++)
		cout << *it;
	cout << endl;

	for (auto c: s)
		cout << s;
	cout << endl;
}

//ColoredShape
//Employee/FullTimeEmploye
//Student/OptionStudent
//Date
//Name
