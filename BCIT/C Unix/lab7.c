#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <errno.h>
#define BUF_SIZE 128
#define READ_END 0
#define WRITE_END 1

//tokenize (char *cmd, char *argc[]) {}

int main() {

	char line[BUF_SIZE] = "";
	char *cmd1[BUF_SIZE] = {0};
	char *cmd2[BUF_SIZE] = {0};
	char *token = "";	
	ssize_t size;

	int fd[2];

	fprintf(stderr, "> ");
	while((size = read(0, line, BUF_SIZE)) > 0) {

		line[size] = 0;

		/*check for pipe*/
		char *strPtr;
		int is_pipe;
		if((strPtr = strchr(line, '|')) == NULL) {	
			is_pipe = 0;		
		} 
		else {
			*strPtr = '\0';
			is_pipe = 1;
			if(pipe(fd) == -1) {
				perror("Pipe failed");
				exit(-1);
			}
		}
		
		int cmdi = 0;
		cmd1[cmdi] = strtok(line, " \n");
		cmdi++;
		while((token = strtok(NULL, " \n")) != NULL) {
			cmd1[cmdi] = token;
			cmdi++;
		}
		cmd1[cmdi] = NULL;

		if(is_pipe == 1) {
			cmdi = 0;
			cmd2[cmdi] = strtok(++strPtr, " \n");
			cmdi++;
			while((token = strtok(NULL, " \n")) != NULL) {
				cmd2[cmdi] = token;
				cmdi++;
			}
			cmd2[cmdi] = NULL;
		}

		pid_t pid = fork();

		if(pid == -1) {			// borked
			perror("fork()");
			exit(-1);
		} else if(pid == 0) {	// child 1
			if(is_pipe == 1) {	//check if pipe possible				

				close(fd[READ_END]);
				dup2(fd[WRITE_END], STDOUT_FILENO);
				close(fd[WRITE_END]);

				execvp(cmd1[0], cmd1);
			} else {
				execvp(cmd1[0], cmd1);
			}
		} else {				// parent
			if(is_pipe == 1) {
				pid_t pid2 = fork();
				if(pid2 == -1) {
					perror("fork2()");
					exit(-1);
				} else if(pid2 == 0) {	// child 2

					close(fd[WRITE_END]);
					dup2(fd[READ_END], STDIN_FILENO);
					close(fd[READ_END]);

					execvp(cmd2[0], cmd2);					

				} else {				// parent
					close(fd[READ_END]);
					close(fd[WRITE_END]);
					wait(NULL); wait(NULL);
				}
			} else { wait(NULL); }			
		}
		fprintf(stderr, "> ");
	}
	fprintf(stderr, "exiting...\n");
	return 0;
}

//execute2(cmd1, cmd2)