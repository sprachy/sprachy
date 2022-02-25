import csv
import random
from nltk.corpus import wordnet as wn
from genderdeterminator import GenderDeterminator, Case
gd = GenderDeterminator()

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

def nouns_that_are(thing: str):
  syns = wn.synsets(thing)
  pos_syns = [s for s in syns if s.pos() == 'n']
  hypos = deep_hyponyms(pos_syns[0])
  results = []
  for hypo in hypos:
    en = hypo.lemma_names()[0]
    de = wn_german_translations.get((hypo.pos(), hypo.offset()))
    if not de:
      print("No German translation for", hypo)
      continue

    gender = gd.get_gender(de)
    if not gender:
      print(f"Unknown gender for {de}")
      continue

    results.append({
      'en': en.replace('_', ' '),
      'de': de,
      'gender': gd.get_gender(de)
    })
  return results

def generate_exercise():
    nouns = nouns_that_are('nut')

    for noun in nouns:
      article = 'das'
      if noun['gender'] == 'm':
        article = 'der'
      elif noun['gender'] == 'f':
        article = 'die'

      print(f"Ich möchte {article} {noun['de']} essen")
      print(f"I would like to eat the {noun['en']}")
      print("")


generate_exercise()