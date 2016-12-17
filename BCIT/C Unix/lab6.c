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
	int pid;			// product id
	int counter;
	int data[NITEMS];	// actual data (the buffer)	
} buf = {0, 0, 0, 0, {0}};

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t notfull = PTHREAD_COND_INITIALIZER;
pthread_cond_t notempty = PTHREAD_COND_INITIALIZER;

void *produce(void *arg) {
	pthread_detach(pthread_self());
	int id = (intptr_t) arg;
	int i;
	while(1) {
		pthread_mutex_lock(&mutex);
		while(buf.counter == 100) {
			pthread_cond_wait(&notfull, &mutex);
		}
		buf.data[buf.next_write] = buf.pid;
		buf.pid++;
		i = buf.next_write;
		printf("+%d: %d --> #%d\n", id, buf.data[i], i);
		buf.next_write = (buf.next_write + 1) % NITEMS;
		buf.counter--;
		//sleep(1);		
		pthread_cond_signal(&notempty);
		pthread_mutex_unlock(&mutex);
	}
	return 0;
}

void *consume(void *arg) {
	pthread_detach(pthread_self());
	int id = (intptr_t) arg;
	int i;
	while(1) {
		pthread_mutex_lock(&mutex);
		while(buf.counter == 0) {
			pthread_cond_wait(&notempty, &mutex);
		}
		i = buf.next_read;
		printf("-%d: %d <-- #%d\n", id, buf.data[i], i);
		buf.next_read = (buf.next_read + 1) % NITEMS;
		buf.data[i] = -1;
		buf.counter++;
		//sleep(1);
		pthread_cond_signal(&notfull);
		pthread_mutex_unlock(&mutex);
	}
	return 0;
}

int main(void) {
	pthread_t producer_thread1, consumer_thread1, producer_thread2, consumer_thread2;

	buf.next_write = 0;
	buf.next_read = 0;
	buf.pid = 0;

	if(pthread_create(&producer_thread1, 0, produce, (void *) 0) != 0) {
		perror("pthread_create tid0");
	}
	if(pthread_create(&consumer_thread1, 0, consume, (void *) 1) != 0) {
		perror("pthread_create tid2");
	}
	if(pthread_create(&producer_thread2, 0, produce, (void *) 2) != 0) {
		perror("pthread_create tid3");
	}
	if(pthread_create(&consumer_thread2, 0, consume, (void *) 3) != 0) {
		perror("pthread_create tid4");
	}
	pthread_exit(0);
}