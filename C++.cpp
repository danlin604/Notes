/*
*	Notes for C++
*
*	Search @Title for code 
*/

g++ -std=c++11 -W -Wall -pedantic lab1.cpp
./a.exe
./a 2>filename.txt //output to file

#include <iostream> 
#include <iomanip> //hex
#include <string> //length()
#include <sstream> //istringstream
#include <fstream> //ifstream
#include <cstring>
#include <cctype>
#include <list>
#include <deque>
#include <vector>
#include <algorithm>
#include <functional>
#include <cstdlib>
#define MACRONAME 10
using namespace std;

#define CAPACITY 10

int main() {
	private:
		T data_[CAPACITY];
		size_t size_;
	public:
		Stack(): size_(0){} //always use member initializers!

	bool empty() const {return size_ == 0;}

	//std::cout << "hello world" << std::endl;
	cout << "hello world" << endl;

	s.length(); //return the length of the string
	s.size(); //return the length of the string
	s.max_size(); //returns the maximum possible character the string can store.

}

===========================
//try to get line
cout << "enter an line: ";
string line;
while(1) {
	if (!getline(cin, line)) {
		cin.clear();
		break;
	}
	//do
}
===========================
//use string input
istringstream iss1(line);
string word1;
if(iss1 >> word1) //is line valid?
	istringstream iss2(word1); //abc123
===========================
//use words
int n;
string s;
if(iss2 >> n) //int
	cout << n;
else
	iss2.clear();
if(iss2 >> s) //string
	cout << s;
else
	iss2.clear();
===========================
//multiword input
while (getline(cin, line)) {
	bool intFlag = 0;
	bool doubleFlag = 0;
	//input
	istringstream iss(line);

	if ((iss >> word1 >> word2)) {
		continue;
	}
	istringstream iss1(word1);
	istringstream iss2(word2);
}
===========================
//copy character by character
inline void copy(istream& is, ostream& os) {
	char c;
	while(is.get(c))
		os.put(c);		
}

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

#include <iostream> 
#include <iomanip> //hex
#include <string> //length()
#include <sstream> //istringstream
#include <fstream> //ifstream
#include <cstring>
#include <cctype>
using namespace std;
// ./a 2>filename.txt
//8cZHVYzE
bool get_word(const string& prompt, string& word, bool(*is_valid)(const string&)) {
	string line;
	string w;
	cout << prompt;
	while (1) {
		if (!getline(cin, line)) {
			cin.clear();
			break;
		}
		istringstream iss(line);
		if (iss >> w) {
			cout << w << endl;
			if (is_valid(w)) {
				word = w; //stored if valid
				return true;
			}
			//break;
		}
	}
	return false;
}


bool get_int(const string& prompt, int& n, bool(*is_valid)(int)) {
	string line;
	int num;
	cout << prompt;
	while (1) {
		if (!getline(cin, line)) {
			cin.clear();
			break;
		}
		istringstream iss(line);
		if (iss >> num) {
			cout << num << endl;
			if (is_valid(num)) {
				n = num; //stored if valid
				return true;
			}
		}
	}
	return false;
}

bool is_valid(const string& s) {
	if (s.length() != 9) {
		return false;
	}
	if (s[0] != 'a') {
		return false;
	}
	for (int i = 1; i < 9; i++) {
		if (!isdigit(s[i])) {
			return false;
		}
	}
	return true;
}

bool is_valid_int(int n) {
	if (n > 100 || n < 0) {
		return false;
	}
	return true;
}

int main() {
	string word;
	string& rword = word;
	int n;
	int& rn = n;
	string promptstring = "get string: ";
	string promptint = "get int: ";
	
	while (1) {
		get_word(promptstring, rword, is_valid);
		get_int(promptint, rn, is_valid_int);
		cerr << rword << " " << rn << endl;
	}
	
	/*
	while(get_word(promptstring, rword, &is_valid) && get_int(promptint, rn, &is_valid_int)) {
		cerr << rword << " " << rn << endl;
	}*/


	return 0;
}

===========================




#include <iostream>
#include <sstream>
#include <iomanip>
#include <cstdlib>
#include <cstring>
#include <cctype>
#include <fstream>
#include <vector>

using namespace std;

string rtrim(const string& s);
string replace_all(const string& s, const string& oldstr, const string& newstr);
string squeeze(const string& s, char c);
vector<string> split(const string& s, const string& delim);


int main() {
	//rtrim
	cout << endl << "rtrim function:" << endl << rtrim("   hello world	 ") << endl;

	//replace_all
	cout << "replace_all function:" << endl << replace_all("alley-dalley", "al", "oke") << endl;

	//squeeze
	cout << "squeeze function:" << endl << squeeze("naahaaasapeemaapetilon", 'a') << endl;

	//split
	vector<string> v;

	v = split("ab<cd>ef<gh>i","<>");
	cout << "First split: " << endl;
	for (auto& s: v) {
		cout << s << '|' << endl;
	}

	v = split("<ab><>cd<","<>");
	cout << "Second split: " << endl;
	for (auto& s: v) {
		cout << s << '|' << endl;
	}

	cout << endl << endl << endl << endl << endl;
}

string rtrim(const string& s){
	string::size_type i;
	for(i = (s.size()); i > 0; i--){
		if(!isspace(s[i-1])) {
			break;
		}
	} 
	return s.substr(0, (i));
}

string replace_all(const string& s, const string& oldstr, const string& newstr) {
	string output = s;
	string::size_type i = 0;
 	while ((i = output.find(output, i)) != string::npos) {
     	output.replace(i, oldstr.length(), newstr);
     	i += newstr.length();
	}
	return output;
}

string squeeze(const string& s, char c) {
	string output;
	string :: size_type i;
	bool skipFlag;
	for(i = 0; i < s.size(); i++){
		skipFlag = false;
		if(i == 0){
			// cast first character regardless and redo loop
			output = output + s[i];
			continue;
		}
		if(s[i] == c && s[i-1] == c){
			skipFlag = true;
		}
		if(!skipFlag) {
			output = output + s[i];
		}
	}
	return output;
}

vector<string> split(const string& s, const string& delim){
	vector<string> v;
	string::size_type start = 0, pos;
	while ((pos = s.find_first_of(delim, start)) != string::npos) {
		v.push_back(s.substr(start, (pos-  start)));
		start = pos+1;
	}
	v.push_back(s.substr(start));
	return v;
}


===========================
#include "stdafx.h"
#include <iostream> 
#include <iomanip> //hex
#include <string> //length()
#include <sstream> //istringstream
#include <fstream> //ifstream
#include <cstring>
#include <deque>
#include <list>
#include <cctype>
#include <vector>
#include <algorithm>
#include <functional>
#include <cstdlib>
#include <map>
#include <set>
#include <iterator>
using namespace std;
// g++ -std=c++11 -W -Wall -pedantic file.cpp
// ./a.exe
// ./a.exe 2>filename.txt //output to file
// ./a.exe < test.txt


struct Grades {
	string				id;		//a12345678
	map<string, int>	scores;	//COMP3512, 100
};

ostream&
operator<<(ostream& os, Grades& g) {
	cout << g.id << endl;
	cout << g.scores.size() << endl;
	for (auto& x : g.scores)
		cout << x.first << ' ' << x.second << endl;
	return os;
}

istream& //so cin can use it
operator>>(istream& is, Grades& g) {
	if (is >> g.id) {
		int size;
		is >> size;
		string course;
		int score;
		g.scores.clear();
		for (int i = 0; i < size; i++) {
			is >> course;
			is >> score;
			g.scores[course] = score;
		}
		return is;
	}
	return is;
}

struct Cmp {
	string key;
	Cmp(const string& course) :key(course) {}

	bool operator()(const Grades& g1, const Grades& g2) const {
		auto gs1 = g1.scores.find(key);
		auto gs2 = g2.scores.find(key);


		if (gs1 == g1.scores.end()) { //1st null; 2nd goes ahead
			return false;
		}
		if (gs2 == g2.scores.end()) { //2nd null; 1st goes ahead
			return true;
		}

		return gs1->second < gs2->second;
	}
};

struct MaxFinder {
	string				key;
	int					maxscore = -1;
	vector<string>		id;

	MaxFinder(const string& course) : key(course) {}

	void operator()(const Grades& g) {

		auto gs = g.scores.find(key);
		if (gs != g.scores.end()) {
			if (maxscore < gs->second) {
				maxscore = gs->second;

				id.clear();						// remove old max id
				id.push_back(g.id);
			}
			else if (maxscore == gs->second) {	// concat id
				id.push_back(g.id);
			}
		}
	}
};


int main() {
	vector<Grades> v;
	Grades g1, g2, g3, g4, g5, g6;

	g1.id = "a12345671";
	g1.scores["COMP3512"] = 3;
	g1.scores["COMP3920"] = 99;
	g1.scores["COMP3900"] = 99;

	g2.id = "a12345672";
	g2.scores["COMP3512"] = 2;
	g2.scores["COMP3920"] = 99;
	g2.scores["COMP3900"] = 99;

	g3.id = "a12345673";
	g3.scores["COMP3512"] = 1;
	g3.scores["COMP3920"] = 99;
	g3.scores["COMP3900"] = 99;

	g4.id = "a12345674";
	g4.scores["COMP3512"] = 9;
	g4.scores["COMP3920"] = 99;
	g4.scores["COMP3900"] = 99;

	g5.id = "a12345675";
	g5.scores["COMP3512"] = 7;
	g5.scores["COMP3920"] = 99;
	g5.scores["COMP3900"] = 99;

	g6.id = "a12345676";
	g6.scores["COMP3512"] = 6;
	g6.scores["COMP3920"] = 99;
	g6.scores["COMP3900"] = 99;


	v.push_back(g1);
	v.push_back(g2);
	v.push_back(g3);
	v.push_back(g4);
	v.push_back(g5);
	v.push_back(g6);

	sort(v.begin(), v.end(), Cmp("COMP3512"));

	cout << "get max score" << endl;
	MaxFinder m = for_each(v.begin(), v.end(), MaxFinder("COMP3512"));
	cout << m.maxscore << endl;
	
	cout << "get ids of max score" << endl;
	for (int i = 0; i < m.id.size(); i++) {
		cout << m.id[i] << endl;
	}
	
	cout << "print entire sorted in desc" << endl;
	for (auto& x : v) {
		cout << x << endl;
	}
	
}

===========================
#include "stdafx.h"
#include <iostream> 
#include <iomanip> //hex
#include <string> //length()
#include <sstream> //istringstream
#include <fstream> //ifstream
#include <cstring>
#include <deque>
#include <list>
#include <cctype>
#include <vector>
#include <algorithm>
#include <functional>
#include <cstdlib>
#include <map>
#include <set>
#include <iterator>
using namespace std;
// g++ -std=c++11 -W -Wall -pedantic file.cpp
// ./a.exe
// ./a.exe 2>filename.txt //output to file
// ./a.exe < test.txt

//1h
/*
struct f_h {
	int g;
	int l;
	f_h() :g(0), l(0) {}
	void operator() (int n) {
		if (n > 100)
			g++;
		if (n < 0)
			l++;
	}
};
*/



int main() {
	vector<int> v{3,2,7,6,8,1,4,5};
	list<int>	lst{ 9,8,7,6 };
	deque<int> d{ 1,2,3 };


	copy(v.begin(), v.end(), front_inserter(lst));
	for (auto& x : lst)
		cout << x << ' ';

	//1a
	/*
	cout << "1a" << endl;
	//copy(v.end() - 5, v.end(), ostream_iterator<int>(cout, " ")); // 6 8 1 4 5
	copy(next(v.end(), -5), v.end(), ostream_iterator<int>(cout, " "));
	cout << endl;
	*/
	/*
	//1b
	cout << "1b" << endl;
	copy(v.rbegin(), v.rend(), ostream_iterator<int>(cout, " ")); // 5 4 1 8 6 7 2 3
	cout << endl;
	*/
	/*
	//1c
	cout << "1c" << endl;
	copy(lst.begin(), lst.end(), v.begin() + 2); // 3 2 9 8 7 6 4 5 
	for (auto& x : v) {
		cout << x << " ";
	}
	cout << endl;
	*/

	
	//1d
	/*
	cout << "1d" << endl;
	v.insert(v.begin() + 2, lst.begin(), lst.end()); // ans
	for (auto& x : v) {
		cout << x << " ";
	}
	cout << endl;
	*/

	//1e
	/*
	cout << "1e" << endl;
	sort(v.begin(), v.end(), [](int a, int b) { return a > b; }); // desc
	for (auto& x : v) {
		cout << x << " ";
	}
	cout << endl;
	*/

	//1f
	/*
	cout << "1f" << endl;
	//v.resize(v.size() + lst.size());
	transform(lst.begin(), lst.end(), back_inserter(v), [](int n) {return 3 * n;});
	for (auto& x : v) {
		cout << x << " ";
	}
	*/

	//1g
	/*
	cout << "1g" << endl;
	//v.erase(remove_if(), v.end());
	for (auto& x : v) {
		cout << x << " ";
	}
	*/

	//1h
	/*
	cout << "1h" << endl;
	auto it = for_each(v.begin(), v.end(), f_h());
	cout << it.g << endl;
	cout << it.l << endl;
	*/

	//2


}




class Grade {
public:
 string getCourse() {
  return course_;
 }

 int getScore() {
  return score_;
 }
 // friend declarations & additional function declarations if necessary
 friend ostream& operator<<(ostream& os, const Grade& g){
  os << g.course << " " << g.score << endl;
  return os;
 }
 friend std::istream& operator>>(istream& is, Grade& g){
  is >> g.course_ >> g.score_;
  return is;
 }
private:
 string course_;
 int score_;
};