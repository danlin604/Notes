#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdlib.h>
#include <ctype.h>
#include <semaphore.h>

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

	ftruncate(fd, sizeof(counter));

	counter *mapped_area;
	if((mapped_area = (mmap(NULL, sizeof(counter), PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0))) == MAP_FAILED) {
		printf("[mmap == MAP_FAILED]\n");
		return -1;
	}

	sem_init(&mapped_area->lock, 0, 1);
	mapped_area->value = 0;

	return 0;
}