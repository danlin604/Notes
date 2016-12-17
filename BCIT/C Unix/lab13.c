#include <stdio.h>
#include <sys/types.h>
#include <dirent.h>
#include <string.h>
#include <sys/stat.h>
#include <unistd.h>

void rdir(char *arg, int level) {

	DIR *dir;
	struct dirent *entry;

	if((dir = opendir(arg)) == NULL) { return; }

	struct stat buf;

	if(level == 0) {
		printf(" %s/\n", arg);
	}

	while((entry = readdir(dir)) != NULL) {

		if(strcmp(entry->d_name, ".") != 0 && strcmp(entry->d_name, "..") != 0) {	
			char path[512];
			char dir_s[512];

			strcpy(path, arg);
			strcat(path, "/");
			strcat(path, entry->d_name);


			if(lstat(path, &buf) == -1) { return; }

			int i = 0;
			strcpy(dir_s, "   ");
			while(i < level) {
				strcat(dir_s, "   ");
				i++;
			}
			if(S_ISDIR(buf.st_mode)) {
				strcat(dir_s, entry->d_name);
				strcat(dir_s, "/");
			} else {
				strcat(dir_s, entry->d_name);
			}			

			printf("%s\n", dir_s);

			rdir(path, level+1);
		}
	}

	closedir(dir);
}

int main(int argc, char *argv[]) {

	if(argc < 2) {
		printf("[file] [directory]\n");
		return 1;
	}

	int i = 1;
	while(i < argc) {
		rdir(argv[i], 0);
		i++;
	}

	return 0;
}

