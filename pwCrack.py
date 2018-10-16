import hashlib
file = open('words.txt','r')
content = file.readlines()
file.close()
word_list = []

for line in content:
	line = line.strip()
	word_list.append(line)

	
username= input("Username: ")
realm = "Boutique Cassee"

#178ec06684f4d2ca85f4d704eff5ac1d
hashToFind = input("Password hash: ") 

for word in word_list:
	u_p = username+":"+realm+":"+word
	hash = hashlib.md5(u_p.encode()).hexdigest()
	
	if hash == hashToFind:
		print('The password is: ',word)	

