#include <stdio.h>
#include <pthread.h>
#include <unistd.h>
#include <string.h>
#include <errno.h>

void *print(void *arg) {
	char *s = arg;
	pthread_detach(pthread_self());
	int i = 0;
	while(i < 10) {
		write(STDOUT_FILENO, s, strlen(s));
		i++;
	}
	return 0;
}

int main(void) {
	pthread_t tid1, tid2;

	if(pthread_create(&tid1, 0, print, "hello\n") != 0) {
		perror("pthread_create tid1");
	}
	if(pthread_create(&tid2, 0, print, "world\n") != 0) {
		perror("pthread_create tid2");
	}

	pthread_exit(0);
}