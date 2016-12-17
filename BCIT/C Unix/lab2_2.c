#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <dirent.h>
#include <errno.h>

int main(int argc, char*argv[]) {
 
  pid_t pid = fork();

  if(pid == -1) {
    perror("fork()");
    exit(-1);
  }

  if(pid == 0) {   //child

    char* args[1024] = {"ls", "-l"};
    
    if(argc == 1) {
      args[2] = 0;      
      execvp("/bin/ls", args);
    } else {
      int argi = 1; //argv path
      int i = 2;    //args pos
      while(argi < argc) {
        DIR* dir = opendir(argv[argi]);
        if(dir) { //dir exists
          args[i] = argv[argi];
          argi++;
          i++;
          closedir(dir);
        } else if (ENOENT == errno) { // dir not exist
          argi++;
        } else { // other err
          argi++;
        }
      }
      args[i] = 0;      
      execvp("/bin/ls", args);      
    }
  } else {          //parent;
    wait(NULL);      
  }

  return 0;
}