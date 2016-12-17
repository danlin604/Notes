#include <stdio.h>
#include <unistd.h>
#include <signal.h>
#include <stdlib.h>
#define BUF_SIZE 512

volatile sig_atomic_t count = 0;

void sighandler() {
	//write(1, "handler\n", 8);

	//do count in here
	sleep(6);
}

int main(void) {

	char line[BUF_SIZE] = "";

	struct sigaction act;
	act.sa_handler = sighandler;
	sigemptyset(&act.sa_mask);
	sigaddset(&act.sa_mask, SIGQUIT);
	act.sa_flags = 0;
	//act.sa_flags |= SA_RESTART;

	if(sigaction(SIGALRM, &act, 0) == -1) {
		perror("sigaction");
	}

	int i = 0;
	while(i < 3) {
		printf("loop begin\n");

		alarm(6);		

		int r = read(0, line, BUF_SIZE);

		if(r == -1) {
			//printf("exit handler\n");
		}

		if(r > 0) {
			alarm(0);
			printf("echo: %s", line);
			sleep(15);
			printf("goodbye\n");
			exit(1);
		} else if(r == 0) {
			alarm(0);
			fprintf(stderr, "eof, goodbye\n");	
			exit(1);
		}

		i++;		
	}
	printf("exit loop, goodbye\n");
	
	return 0;
}