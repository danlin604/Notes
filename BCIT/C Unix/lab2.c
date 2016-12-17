#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#define BUF_SIZE 128

int main(int argc, char*argv[]) {
  
  if(argc != 3) {
    printf("requires [src] [dest]\n");
    return -1;
  }

  char buf[BUF_SIZE] = "";
  int count = BUF_SIZE;
  ssize_t size;  
  int src = open(argv[1], O_RDONLY); //-1 = failed
  int dest = open(argv[2], O_CREAT | O_EXCL | O_WRONLY, 0666); //-1 = failed; devil 

  if(src != -1 && dest != -1) {
      while((size = read(src, buf, count)) > 0) {
      write(1, buf, size); //echo
      write(dest, buf, size);
    }
  } else {
    printf("Failed to open src[%s] & create dest[%s].\n", argv[1], argv[2]);
  }

  close(src);
  close(dest);

  return 0;
}