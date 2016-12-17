#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdlib.h>
#include <ctype.h>
#include <semaphore.h>
#define MAP_SIZE 512
#define NTIMES 32

typedef struct {
	sem_t lock;
	unsigned long value;
} counter;

int main() {

	int fd = shm_open("/shm", O_CREAT|O_RDWR, 0666);
	if(fd == -1) {
		printf("[fd == -1]\n");
		return -1;
	}

	ftruncate(fd, MAP_SIZE);

	counter *mapped_area;
	if((mapped_area = (mmap(NULL, MAP_SIZE, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0))) == MAP_FAILED) {
		printf("[mmap == MAP_FAILED]\n");
		return -1;
	}

	int i = 0;
	while(i < NTIMES) {

		sem_wait(&mapped_area->lock);
		printf("inc2: %ld\n", mapped_area->value);
		mapped_area->value++;
		sem_post(&mapped_area->lock);
		i++;
		sleep(1);
	}

	return 0;
}