import sys, math, struct, pickle, hashlib, lib

def main():
	if (len(sys.argv) != 7):
		print("Numero de argumentos incorreto. Utilize:")
		print("python cache_simulator.py <nsets> <bsize> <assoc> <substituição> <flag_saida> arquivo_de_entrada")
		exit(1)

	cont_miss_comp = 0
	cont_miss_conf = 0
	cont_miss_cap = 0
	cont_hit = 0

	n_sets = int(sys.argv[1])
	b_size = int(sys.argv[2])
	assoc = int(sys.argv[3])
	subst = sys.argv[4]
	flag_out = int(sys.argv[5])
	entry_file = sys.argv[6]

	cache_val = [None] *  (n_sets * assoc)
	cache_tag = [None] *  (n_sets * assoc)

	n_bits_offset = int(math.log(b_size, 2))
	n_bits_indice = int(math.log(n_sets, 2))
	n_bits_tag = 32 - n_bits_offset - n_bits_indice
	print("n_bits_offset:", n_bits_offset)
	print("n_bits_indice:", n_bits_indice)
	print("n_bits_tag:", n_bits_tag)
	# cache_simulator <nsets> <bsize> <assoc> <substituição> <flag_saida> arquivo_de_entrada
	try:
		with open("./addresses/" + entry_file, "rb") as file:
			for line in file.read():
				print(line)
			
				if (cache_val[n_bits_indice]==0):
					cont_miss_comp +=1
					cache_val[n_bits_indice] = 1
					cache_tag[n_bits_indice] = n_bits_tag
				
				elif (cache_tag[n_bits_indice]==n_bits_tag):
					cont_hit +=1
				
				else:
					if (cache_tag[n_bits_indice]!=n_bits_tag and cache_val[n_bits_indice]==1):
						cont_miss_conf +=1

					else:
						cont_miss_cap += 1

				
			# lines = list(file.read())
			# addresses = []
			# del lines[:3]

			# for index, item in enumerate(lines):
			# 	if index % 4 == 0:
			# 		addresses.append(item)

			# for address in addresses:
			# 	# print('address:',address)
			# 	# print((n_bits_offset + n_bits_indice))
			# 	tag = address >> (n_bits_offset + n_bits_indice)
			# 	indice = (address >> n_bits_offset) & (pow(2, n_bits_indice)-1)

			# 	if(cache_val[indice] == 0):
			# 		cont_miss_comp += 1
			# 		cache_val[indice] = 1
			# 		cache_tag[indice] = tag
			# 	elif(cache_tag[indice] == tag):
			# 		cont_hit += 1
			# 	else:
			# 		cont_miss_conf += 1
			# 		cache_val[indice] = 1
			# 		cache_tag[indice] = tag
			# print(cache_val)
			# print(cache_tag)
				# print('tag:',tag)
				# print('indice:',indice)
				# print("______________________")
	except BaseException as error:
		print(str(error))

if __name__ == '__main__':
	main()