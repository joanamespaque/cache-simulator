import math

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

f = open("input.bin", "r")
data = int(f.read())

bsize = 32
nsets = 4
n_bits_offset = int(math.log(bsize, 2))
n_bits_indice = int(math.log(nsets, 2))
n_bits_tag = 32 - n_bits_offset - n_bits_indice

print("n_bits_offset: ", n_bits_offset)
print("n_bits_indice: ", n_bits_indice)
print("n_bits_tag: ", n_bits_tag)

tag = data >> (n_bits_offset + n_bits_indice)
indice = (data >> n_bits_offset) & (2**n_bits_indice - 1)
offset = data & (2**n_bits_offset - 1)

tagMask = "{:0" + str(n_bits_tag) + "b}"
indiceMask = "{:0" + str(n_bits_indice) + "b}"
offsetMask = "{:0" + str(n_bits_offset) + "b}"

tagBonitin = tagMask.format(tag)
indiceBonitin = indiceMask.format(indice)
offsetBonitin = offsetMask.format(offset)

print(bcolors.WARNING + tagBonitin + bcolors.ENDC + "" + bcolors.OKBLUE + indiceBonitin + bcolors.ENDC + "" + bcolors.OKGREEN + offsetBonitin + bcolors.ENDC)