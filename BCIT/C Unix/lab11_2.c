#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/wait.h>
#define BUF_SIZE 512 

int main() {

	char line[BUF_SIZE] = "";
	char *cmd[BUF_SIZE] = {0};
	char *token = "";	
	ssize_t size;

	fprintf(stderr, "> ");
	while((size = read(0, line, BUF_SIZE)) > 0) {
		line[size] = 0;
		int cmdi = 0;
		cmd[cmdi] = strtok(line, " \n");
		cmdi++;

		while((token = strtok(NULL, " \n")) != NULL) {
			cmd[cmdi] = token;
			cmdi++;
		}
		cmd[cmdi] = NULL;

		if(strcmp(cmd[0], "cd") == 0) {
			if(chdir(cmd[1]) == -1) {
				printf("[chdir failed]\n");
			}
		}

		pid_t pid = fork();
		if(pid == -1) {			// borked
			perror("fork()");
			exit(-1);
		} else if(pid == 0) {	// child
			execvp(cmd[0], cmd);
		} else {				// parent
			wait(NULL);
		}

		fprintf(stderr, "> ");
	}
	fprintf(stderr, "exiting...\n");
	return 0;
}