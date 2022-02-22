import csv
import random
from nltk.corpus import wordnet as wn

def load_wn_german_translations():
    # NLTK wordnet doesn't have german translations by default
    # so we load them from the Extended Wordnet that's based on
    # Wiktionary

    translations = {}
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

            translations[(pos, offset)] = deword

    return translations

wn_german_translations = load_wn_german_translations()

def deep_hyponyms(synset):
  """Given a Wordnet synset object, return a list of all of its
  hyponyms and their hyponyms, etc."""
  results = set()
  hyponyms = synset.hyponyms()
  while len(hyponyms) > 0:
      next_hyponyms = []
      for synset in hyponyms:
          hypos = synset.hyponyms()
          if len(hypos):
              next_hyponyms.extend(hypos)
          results.add(synset)
      hyponyms = next_hyponyms
  return results

def terms_that_are(thing: str, pos: str = 'n'):
  syns = wn.synsets(thing)
  pos_syns = [s for s in syns if s.pos() == pos]
  hypos = deep_hyponyms(pos_syns[0])
  results = []
  for hypo in hypos:
    en = hypo.lemma_names()[0]
    de = wn_german_translations.get((hypo.pos(), hypo.offset()))
    if not de:
      continue
    results.append({
      'en': en.replace('_', ' '),
      'de': de
    })
  return results

def generate_exercise():
    nouns = terms_that_are('book', pos='n')

    for noun in nouns:
      print(f"Ich möchte {noun['de']} essen")
      print(f"I would like to eat {noun['en']}")
      print("")


generate_exercise()