import csv
import sys
from nltk.corpus import wordnet as wn
from genderdeterminator import GenderDeterminator, Case

def load_wn_german_translations():
    # NLTK wordnet doesn't have german translations by default
    # so we load them from the Extended Wordnet that's based on
    # Wiktionary

    translations = []
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

            translations.append({
              'id': f"{pos}{offset}",
              'de': deword
            })

    return translations

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
  wn_german_translations = load_wn_german_translations()
  gd = GenderDeterminator()

  de_words_by_id = {}
  for translation in wn_german_translations:
    if translation['id'] in de_words_by_id:
      de_words_by_id[translation['id']] = translation['de']
    else:
      de_words_by_id[translation['id']] = translation['de']

  syns = wn.synsets(thing)
  pos_syns = [s for s in syns if s.pos() == 'n']
  hypos = deep_hyponyms(pos_syns[0])
  results = []
  for hypo in hypos:
    en = hypo.lemma_names()[0]
    de = de_words_by_id.get(f"{hypo.pos()}{hypo.offset()}")
    if not de:
      # print("No German translation for", hypo)
      continue

    gender = gd.get_gender(de)
    if not gender:
      # print(f"Unknown gender for {de}")
      continue

    results.append({
      'en': en.replace('_', ' '),
      'de': de,
      'gender': gender
    })
  return results

if __name__ == '__main__':
  category = sys.argv[1]
  for noun in nouns_that_are(category):
    if noun['gender']:
      article = 'das'
      if noun['gender'] == 'm':
        article = 'der'
      elif noun['gender'] == 'f':
        article = 'die'

      print(f"{article} {noun['de']}")
      print(f"the {noun['en']}")
      print()


# def make_sprachy_dataset():
#   wn_german_translations = load_wn_german_translations()
#   gd = GenderDeterminator()
#   de_words_by_id = {}
#   for translation in wn_german_translations:
#     if translation['id'] in de_words_by_id:
#       de_words_by_id[translation['id']].append(translation['de'])
#     else:
#       de_words_by_id[translation['id']] = [translation['de']]

#   print("Translating synsets")
#   terms = []
#   translated = 0
#   untranslated = 0
#   for synset in wn.all_synsets():
#     offset = synset.offset()
#     pos = synset.pos()
#     if pos != 'n': continue

#     synset_id = f"{pos}{offset}"
#     de_words = de_words_by_id.get(synset_id)
    
#     if not de_words or len(de_words) == 0:
#       untranslated += 1
#       continue
#     else:
#       translated += 1

#     terms.append({
#       'en': synset.lemma_names()[0],
#       'de': de_words[0],
#       'gender': gd.get_gender(de_words[0])
#     })

#   print(f"Translated {translated} synsets, no match for {untranslated}")
#   with open('./data/sprachy-nouns.json', 'w', encoding='utf-8') as f:
#     f.write(json.dumps(terms, indent=2, sort_keys=True))
#   # for wncode, de in translations.items():
#   #   try:
#   #     synset = wn.synset_from_pos_and_offset(wncode[1], wncode[0])
#   #   except KeyError:
#   #     print(f"Couldn't find synset for {wncode}")
#   #     continue
#   #   print(synset, de)

# make_sprachy_dataset()



# def generate_exercise():
#     nouns = nouns_that_are('nut')

#     for noun in nouns:
#       article = 'das'
#       if noun['gender'] == 'm':
#         article = 'der'
#       elif noun['gender'] == 'f':
#         article = 'die'

#       print(f"Ich möchte {article} {noun['de']} essen")
#       print(f"I would like to eat the {noun['en']}")
#       print("")