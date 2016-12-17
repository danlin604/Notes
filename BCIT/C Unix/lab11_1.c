#include <stdio.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <time.h>

int main(int argc, char *argv[]) {

	if(argc < 2) {
		fprintf(stderr, "[file] [path]\n");
	}

	struct stat st;

	int i = 1;
	while(i < argc) {
		if(stat(argv[i], &st) == 0) {
			fprintf(stderr, "name: %s\n", argv[i]);
			fprintf(stderr, "device #: %ld\n", st.st_dev);
			fprintf(stderr, "i-number: %ld\n", st.st_ino);
			fprintf(stderr, "# of links: %ld\n", st.st_nlink);
			fprintf(stderr, "user ID: %ld\n", (long int) &st.st_uid);
			fprintf(stderr, "group ID: %ld\n", (long int) &st.st_gid);
			fprintf(stderr, "mode: %ld\n", (long int) &st.st_mode);
			fprintf(stderr, "size: %ld\n", st.st_size);
			fprintf(stderr, "access time: %s", ctime(&st.st_atime));
			fprintf(stderr, "modification time: %s", ctime(&st.st_mtime));
			fprintf(stderr, "status change time: %s\n", ctime(&st.st_ctime));
		} else {
			fprintf(stderr, "[path: %s not found]\n\n", argv[i]);
		}		
		i++;
	}

	return 0;
}