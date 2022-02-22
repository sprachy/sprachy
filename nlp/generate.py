import csv
from nltk.corpus import wordnet as wn

nuts = set()
nut = wn.synset('nut.n.01')
hyponyms = nut.hyponyms()
while len(hyponyms) > 0:
    next_hyponyms = []
    for synset in hyponyms:
        hypos = synset.hyponyms()
        if len(hypos):
            next_hyponyms.extend(hypos)
        nuts.add(synset)
    hyponyms = next_hyponyms



with open('data/extwordnet/wikt/wn-wikt-deu.tab') as f:
    reader = csv.reader(f, delimiter='\t')
    header = True
    for row in reader:
        if header:
            header = False
            continue
        wncode, _, deword = row
        offset, pos = wncode.split('-')
        offset = int(offset)

        synset = wn.synset_from_pos_and_offset(pos, offset)

        if synset in nuts:
            print(deword, synset)