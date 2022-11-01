import sys, math, struct, pickle, hashlib

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

	cache_val = [0] *  (n_sets * assoc)
	cache_tag = [0] *  (n_sets * assoc)

	n_bits_offset = int(math.log(b_size, 2))
	n_bits_indice = int(math.log(n_sets, 2))
	n_bits_tag = 32 - n_bits_offset - n_bits_indice

	data = open("./adresses/" + entry_file, "rb")
	adresses = []
	try:
		adresses_list = list(data.read())
		adresses_list.remove(0)
		adresses_list.remove(0)
		adresses_list.remove(0)
		print(adresses_list)
		print('------------------------')
		for index, item in enumerate(adresses_list):
			if index % 4 == 0:
				adresses.append(item)
		for item in adresses:
			tag = item >> (n_bits_offset + n_bits_indice)
			indice = (item >> n_bits_offset) & int((pow(2, n_bits_indice-1)))
			print(item)
			print(tag)
			print('----------------')
			# print(item)
		# 	if(cache_val[indice] == 0):
		# 		cont_miss_comp += 1
		# 		cache_val[indice] = 1
		# 		cache_tag[indice] = tag
		# 	elif (cache_tag[indice] == tag):
		# 		cont_hit += 1
		# 	else:
		# 		cont_miss += 1
		# 		cache_val[indice] = 1
		# 		cache_val[indice] = tag
		# 	cont_miss = cont_miss_cap + cont_miss_comp + cont_miss_conf
	except:
		print("Problemas com o arquivo " + entry_file)
if __name__ == '__main__':
	main()