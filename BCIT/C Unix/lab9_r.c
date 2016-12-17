#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdlib.h>
#include <ctype.h>
#define MAP_SIZE 512

int main() {

	int fd = shm_open("/shm", O_RDWR, 0666);
	if(fd == -1) {
		printf("[fd == -1]\n");
		return -1;
	}

	ftruncate(fd, MAP_SIZE);

	int *mapped_area;
	if((mapped_area = mmap(NULL, MAP_SIZE, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0)) == MAP_FAILED) {
		printf("[mmap == MAP_FAILED]\n");
		return -1;
	}

	int i = 0;
	int *ptr = mapped_area;
	while(i < 20) {
		printf("%d ", *ptr++); 
		i++;
	}
	printf("\n");

	if(munmap(mapped_area, MAP_SIZE) == -1) {
		perror("munmap");
	}
	shm_unlink("/shm");	
	close(fd);


	return 0;
}