#include <stdio.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <pthread.h>
#include <unistd.h>
#include <string.h>
#define BUF_SIZE 128

void *print(void *arg) {
	ssize_t size;
	char buf[BUF_SIZE] = "";
	int count = BUF_SIZE;
	int fd = *((int *) arg);
	while((size = read(fd, buf, count)) > 0) {
		write(STDOUT_FILENO, buf, size);
	}	
	pthread_detach(pthread_self());
	return 0;
}

int main(void) {

	int fifo1 = open("fifo1", O_RDONLY);
	int fifo2 = open("fifo2", O_RDONLY);

	if(fifo1 != -1 && fifo2 != -1) {		//open success

		pthread_t tid1, tid2;

		if(pthread_create(&tid1, 0, print, &fifo1) != 0) {
			fprintf(stderr, "Thread 1 failed to create.\n");
		}
		if(pthread_create(&tid2, 0, print, &fifo2) != 0) {
			fprintf(stderr, "Thread 2 failed to create.\n");
		}
	} else {
		fprintf(stderr, "Open failed.\n");
	}	
	pthread_exit(0);
}