#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdlib.h>
#include <ctype.h>

int main(int argc, char *argv[]) {

	if(argc != 3) {
		printf("[argc != 3]\n");
		return -1;
	}

	int fd;
	if((fd = open(argv[1], O_RDWR, 0666)) == -1) {
		printf("[open == -1]\n");
		return -1;
	}

	struct stat fd_stat;
	fstat(fd, &fd_stat);
	int size = (int)fd_stat.st_size;
	printf("[fd size: %d]\n", (int)fd_stat.st_size);

	char *mapped_area;
	if((mapped_area = (mmap(NULL, fd_stat.st_size, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0))) == MAP_FAILED) {
		printf("[mmap == MAP_FAILED]\n");
		return -1;
	}
	
	int num = strtol(argv[2], NULL, 10);
	if(num == 0) {
		printf("[argv[2]: %d]\n", num);
		return -1;
	}

	if(num < size) {
		size = num;
	}
	
	int i = 0;
	while(i < size) {
		mapped_area[i] = toupper(mapped_area[i]); 
		i++;
	}

	if(munmap(mapped_area, fd_stat.st_size) == -1) {
		printf("[munmap == -1]\n");
	}
	close(fd);
	return 0;
}