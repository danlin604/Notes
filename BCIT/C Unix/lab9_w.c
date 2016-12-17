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

	int fd = shm_open("/shm", O_CREAT|O_RDWR, 0666);
	if(fd == -1) {
		printf("[fd == -1]\n");
		return -1;
	}

	ftruncate(fd, MAP_SIZE);

	int *mapped_area;
	if((mapped_area = (mmap(NULL, MAP_SIZE, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0))) == MAP_FAILED) {
		printf("[mmap == MAP_FAILED]\n");
		return -1;
	}

	int i = 1;
	while(i <= 20) {
		int n = i*3;
		*mapped_area = n;
		mapped_area++;
		
		printf("%d\n", n);
		i++;
	}


	return 0;
}