/* -------------------------------------------------- */
	Hello C
/* -------------------------------------------------- */

#include <stdio.h>

int main(void) 
{
	printf("hello, world\n");
}



/* -------------------------------------------------- */
	Cygwin
/* -------------------------------------------------- */

// compile

	gcc file.c // a.exe
	gcc file.c -o file // file.exe

// run

	./a
	./file.exe


/* -------------------------------------------------- */
	While
/* -------------------------------------------------- */


while(1) 
{
    printf("hello, world\n");
}    


/* -------------------------------------------------- */
	For 
/* -------------------------------------------------- */

for (int i = 0; i < 10; i++) 
{
    printf("hello, world\n");
}

/* -------------------------------------------------- */
	if & else
/* -------------------------------------------------- */

if (1)
{
    printf("hello\n");
}
else if (1)
{
	printf("bonjour\n");
}
else
{
    printf("goodbye\n");
}   


/* -------------------------------------------------- */
	printf
/* -------------------------------------------------- */

// print string
#include <stdio.h>

int main(void) 
{
    char name[128] = "danny";
    printf("hello, %s\n", name);
}



// print some numbers
#include <stdio.h>

int main(void) 
{
    int a = 2; int b = 3; // int 
    
    float c = 2; float d = 3; // float  

    printf("%i + %i = %i\n", a, b, a + b); // int
    printf("%i * %i = %i\n", a, b, a * b); // int
    printf("%f / %f = %f\n", c, d, c / d); // float
}



// sizeof()
#include <stdio.h>

int main(void) 
{
    printf("1 is %lu\n", sizeof(1));
    printf("char is %lu\n", sizeof(char));
    printf("double is %lu\n", sizeof(double));
    printf("float is %lu\n", sizeof(float));
    printf("int is %lu\n", sizeof(int));
    printf("long long is %lu\n", sizeof(long long));
}

/* -------------------------------------------------- */
	
/* -------------------------------------------------- */


/* -------------------------------------------------- */
	
/* -------------------------------------------------- */

/* -------------------------------------------------- */
	Idioms
/* -------------------------------------------------- */

#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <errno.h>
#define CHECK(PRED) printf(“%s…%s\n”, (PRED) ? “passed!” : “FAILED”, #PRED)
#define LINESIZE 1024


              /*********** STANDARD IDIOMS ***********/
                 /**** And other fun examples ****/



/************************TABLE OF CONTENTS *************************/
/**** Copy a heading below and ctrl-f! ****/

/**** STANDARD IDIOM TO PROCESS AN ARRAY ***************************/
/**** STANDARD IDIOM TO PROCESS A STRING ***************************/
/**** FIND THE LENGTH OF A STRING **********************************/
/**** STANDARD IDIOM TO OPEN A FILE ********************************/
/**** PERFORM I/O OPERATIONS ON FILE *******************************/
/**** STANDARD IDIOM TO CLOSE A FILE *******************************/
/**** STANDARD IDIOM TO PROCESS A FILE CHAR BY CHAR ****************/
/**** STANDARD IDIOM TO PROCESS STDIN LINE BY LINE *****************/
/**** CLEARING THE ERROR FROM STDIN ********************************/
/**** USING TERNARY OPERATOR IN PRINTF *****************************/
/**** STANDARD IDIOM TO PROCESS COMMAND LINE ARGUMENTS**************/
/**** SWITCH STATEMENTS ********************************************/
/**** STANDARD IDIOM TO SEEK IN A FILE *****************************/
/**** STANDARD IDIOM TO PROCESS ARRAY BACKWARDS ********************/
/**** STANDARD IDIOM TO FIND n BITS THAT ARE p BITS FROM THE END ***/
/**** STANDARD IDIOM TO PROCESS A STRING, POINTER-STYLE ************/





int main(int argc, char *argv[]) {

int i, count, c, n = 1, j, m = 2, p = 3, total;
char choice = 'y';
int a[LINESIZE];
char s[LINESIZE];
FILE *fp;
char line[LINESIZE];




/**** STANDARD IDIOM TO PROCESS AN ARRAY ***************************/
for (i = 0; i < LINESIZE; i++) {

}
/******************************************************************/














/**** STANDARD IDIOM TO PROCESS A STRING ***************************/
for (i = 0; a[i] != '\0'; i++) {
	/*Does NOT process the null character. */
}
/**** FIND THE LENGTH OF A STRING **********************************/
for (i = 0; a[i] != '\0'; i++) {
	/* Do nothing */
}
printf("%d", i);
/******************************************************************/











/**** STANDARD IDIOM TO OPEN A FILE ********************************/
FILE *fp;

if ((fp = fopen("data.txt", "w+")) == 0) { /* if fails; 0 is null pointer;
		fopen returns the null pointer on faiure */
	perror("fopen");
	/* perror prints a system error message to stderror.
	  it can only be used if a function in the standard library fails and 
		it sets an error number in the global variable "errno". perror looks 
		at and prints a corresponding error message.*/

	/* additional error handling if necessary */
}
/**** PERFORM I/O OPERATIONS ON FILE *******************************/
FILE *fp;

while (fscanf(fp, "%d", &n) == 1) { /*scanning from a file; fp is type FILE* */
	total += n;
}
printf("total:%d", total);
/******************************************************************/

















/**** STANDARD IDIOM TO CLOSE A FILE *******************************/
FILE *fp;

if (fclose(fp) != 0) {
	perror("fclose");
	/*additional error handling if needed */
}
/******************************************************************/















/**** STANDARD IDIOM TO PROCESS A FILE CHAR BY CHAR ****************/
char c;

while ((c = fgetc(fp)) != EOF) {
	fputc(c, stdout);
	putchar(c); /* same thing as fputc above */
	/* Copy into another file:
	fputc(c, ofp); 
	*/
}
/******************************************************************/









/**** STANDARD IDIOM TO PROCESS STDIN LINE BY LINE *****************/
char line[LINESIZE];

while (fgets(line, LINESIZE, stdin)) {
	count++;
}
printf("%d", count);

if (fgets(line, LINESIZE, stdin)) { /* if we can read a line */
/*if (fgets(line, LINESIZE, stdin) != 0) {} --not as good; '!=0' is redundant */
	printf("%s", line);
}
/**** CLEARING THE ERROR FROM STDIN ********************************/
if (!fgets(line, LINESIZE, stdin)) { /* if (fgets() == 0), or if we can't read a line */
		clearerr(stdin); /*clears error; puts stream back into good state*/
		/*break;  if in a loop, break out of loop. */
	}
/******************************************************************/








/**** USING TERNARY OPERATOR IN PRINTF *****************************/
for(i = 1; i < argc; i++) {
	if (i < argc - 1) {
			printf("%s ", argv[i]);
	} else {
		printf("%s\n", argv[i]);
	}
}
/* or use ternary operator: */
for(i = 1; i < argc; i++) {
	printf((i < argc - 1) ? "%s " : "%s\n", argv[i]);
}

/* or */
for(i = 1; i < argc; i++) {
	printf("%s%c", argv[i], (i < argc - 1) ? ' ' : '\n');
}
printf("\n");
/******************************************************************/











/**** STANDARD IDIOM TO PROCESS COMMAND LINE ARGUMENTS**************/
for(i = 1; i < argc; i++) {
		/* process argv[i] */
	}
/******************************************************************/





















/**** SWITCH STATEMENTS ********************************************/
int choice; /* or char choice */

switch (choice) {
case 'y': /*fall through to 'Y' */
case 'Y':
	break;
case 'n':
case 'N':
	break;
default:
	break;
}
/******************************************************************/






















/**** STANDARD IDIOM TO SEEK IN A FILE *****************************/
FILE *fp;
/*
SEEK_SET = from beginning of file
SEEK_CUR = from current position
SEEK_END = from end of file
*/
if (fseek(fp, pos, SEEK_SET) != 0) { /* if fseek fails */
	perror("fseek");
}
/******************************************************************/
















/**** STANDARD IDIOM TO PROCESS ARRAY BACKWARDS ********************/
for (i = 100; i > 0; i--) {
	/* process a[i - 1] */
}

/* check if something is a palindrome */
for (i = 0, j = strlen(s); i < j; i++, j--) {
	if (s[i] != s[j - 1]) {
		printf("NOT a palindrome");
	}
	
	printf("IS a palindrome");
}
/******************************************************************/














/**** STANDARD IDIOM TO FIND n BITS THAT ARE p BITS FROM THE END ***/
	i = m & ~(~0 << n) << p;
/******************************************************************/











/**** STANDARD IDIOM TO PROCESS A STRING, POINTER-STYLE ************/
	char s[] = "world";
	(const) char *p;
	
	for (p = s; *p != '\0'; p++) {
		/* Process *p */
		/* NOTE: does NOT process null character! */
	}
	*p = '\0';
/******************************************************************/

return 0;
}