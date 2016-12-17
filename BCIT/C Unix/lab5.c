#include <stdio.h>
#include <pthread.h>
#include <unistd.h>
#include <string.h>
#include <semaphore.h>
#include <sys/stat.h>
#include <fcntl.h>
#define NITEMS 100
#define NPRODUCERS 2	// unused
#define NCONSUMERS 2	// unused

struct {
	int next_write;		// location to store data (by producer)
	int next_read;		// location to retrieve data (by consumer)
	int pid;
	int data[NITEMS];	// actual data (the buffer)	
} buf = {0, 0, 0, {0}};

sem_t mutex;				// 0 or 1
sem_t producer_semaphore;	// 100
sem_t consumer_semaphore;	// 0

void *produce(void *arg) {
	pthread_detach(pthread_self());
	int id = (intptr_t) arg;
	int i;
	while(1) {
		sem_wait(&producer_semaphore);
		sem_wait(&mutex);	// lock buf

		buf.data[buf.next_write] = buf.pid;
		buf.pid++;
		i = buf.next_write;
		printf("+%d: %d --> #%d\n", id, buf.data[i], i);
		buf.next_write = (buf.next_write + 1) % NITEMS;

		sleep(1);

		sem_post(&consumer_semaphore);
		sem_post(&mutex);	// unlock buf	
	}
	return 0;
}

void *consume(void *arg) {
	pthread_detach(pthread_self());
	int id = (intptr_t) arg;
	int i;
	while(1) {
		sem_wait(&consumer_semaphore);
		sem_wait(&mutex);	// lock buf

		i = buf.next_read;
		printf("-%d: %d <-- #%d\n", id, buf.data[i], i);
		buf.next_read = (buf.next_read + 1) % NITEMS;
		buf.data[i] = -1;

		sleep(1);

		sem_post(&producer_semaphore);
		sem_post(&mutex);	// unlock buf	
	}
	return 0;
}

int main(void) {
	pthread_t producer_thread1, consumer_thread1, producer_thread2, consumer_thread2;

	buf.next_write = 0;
	buf.next_read = 0;
	buf.pid = 0;

	sem_init(&mutex, 0, 1);
	sem_init(&producer_semaphore, 0, 100);
	sem_init(&consumer_semaphore, 0, 0);

	if(pthread_create(&producer_thread1, 0, produce, (void *) 0) != 0) {
		perror("pthread_create tid1");
	}
	if(pthread_create(&consumer_thread1, 0, consume, (void *) 1) != 0) {
		perror("pthread_create tid2");
	}
	if(pthread_create(&producer_thread2, 0, produce, (void *) 2) != 0) {
		perror("pthread_create tid1");
	}
	if(pthread_create(&consumer_thread2, 0, consume, (void *) 3) != 0) {
		perror("pthread_create tid2");
	}

	pthread_exit(0);

}