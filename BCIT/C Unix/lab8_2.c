#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <sys/mman.h>
#include <string.h>
#define MAP_SIZE 512

int main() {

	char *mapped_area;
	if((mapped_area = (mmap(NULL, MAP_SIZE, PROT_READ|PROT_WRITE, MAP_ANONYMOUS|MAP_SHARED, -1, 0))) == MAP_FAILED) {
		printf("[mmap == MAP_FAILED]\n");
		return -1;
	}

	char *s = "Hello, mmap!";
	pid_t pid = fork();
	if(pid == -1) {			// borked
		printf("[pid == -1]\n");
		return -1;
	} else if(pid == 0) {	// child
		sprintf(mapped_area, "%s", s);
	} else {				// parent
		wait(NULL);
		printf("%s\n",mapped_area);
	}
	return 0;
}