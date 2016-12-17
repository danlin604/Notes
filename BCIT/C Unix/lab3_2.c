#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <stdlib.h>
#include <sys/wait.h>

int main() {

	pid_t pid = fork();
	if(pid == -1) {			// borked
		perror("fork()");
		exit(-1);
	} else if(pid == 0) {	// child
		printf("child: ");
		printf("pid: %d, ", getpid());
		printf("ppid: %d, ", getppid());
		printf("pgid: %d\n", getpgrp());

		setpgid(getpid(), 0);
		
		printf("child: ");
		printf("pid: %d, ", getpid());
		printf("ppid: %d, ", getppid());
		printf("pgid: %d\n", getpgrp());
	} else {				// parent
		wait(NULL);
		printf("parent: ");
		printf("pid: %d, ", getpid());
		printf("ppid: %d, ", getppid());
		printf("pgid: %d\n", getpgrp());		
	}

	return 0;
}