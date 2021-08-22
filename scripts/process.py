import csv
import json
import re
import itertools
from collections import defaultdict
from typing import Dict

def generate_groups(lst, n):
    if not lst:
        yield []
    else:
        for group in (((lst[0],) + xs) for xs in itertools.combinations(lst[1:], n-1)):
            for groups in generate_groups([x for x in lst if x not in group], n):
                yield [group] + groups

class Node:
    nodes = {}
    by_term = {}

    @staticmethod
    def get(tid):
        try:
            return Node.nodes[tid]
        except KeyError:
            node = Node(tid)
            Node.nodes[tid] = node
            return node

    def __init__(self, tid):
        self.tid = tid
        self.term = tid[5:]
        self.relations = []
        self.downstream = set()
        self.upstream = set()
        Node.by_term[self.term] = self
        # self.etymological_origin_of = set()
        # self.etymology = set()
        # self.engid = self.term if self.language == 'eng' else self.tid

    def relate_to(self, rel, other):
        rel = rel[4:]
        self.relations.append([rel, other])
        if rel == "etymological_origin_of":
            self.downstream.add(other)
        elif rel == "etymology":
            self.upstream.add(other)
        elif rel == "has_derived_from":
            self.downstream.add(other)
        elif rel == "is_derived_from":
            self.upstream.add(other)

    def __repr__(self):
        # , relations={str([[r[0], r[1].term] for r in self.relations])}
        return f"Node<{self.term}>" 


with open("./data/etymwn.tsv") as f:
    reader = csv.reader(f, delimiter="\t")
    for row in reader:
        tid, rel, tid2 = row
        if tid[0:3] != 'deu' or tid2[0:3] != 'deu':
            continue
        n1 = Node.get(tid)
        n2 = Node.get(tid2)
        n1.relate_to(rel, n2)

with open("./data/a1-wordlist.tsv") as f:
    reader = csv.reader(f, delimiter="\t")
    for row in reader:
        deu = row[1].split(", ")[0].split('/')[0].split(';')[0]
        eng = row[3]

        term = re.sub(r'^(der|die|das) ', '', deu)

        node = Node.by_term.get(term)
        if node and len(node.upstream) == 2:
            print(deu, '\n    ' + ' + '.join([n.term for n in node.upstream]))
        else:
            print(deu, None)





# allnodes = Node.nodes.values()
# snodes = sorted(allnodes, key=lambda n: -len(n.downstream))

# pairs = set()

# for i, node in enumerate(snodes):
#     if len(node.upstream) < 2:
#         continue
#     if len(node.upstream) == 2:
#         pairs.add(tuple(node.upstream))
#     # for pair in generate_groups(list(node.upstream), 2):
#     #     pairs.add(pair[0])

# spairs = sorted(pairs, key=lambda p: -(len(p[0].downstream)+len(p[1].downstream)))

# known_terms = set()

# for p in spairs[0:30]:
#     root1, root2 = p
#     new_root = False
#     for root in p:
#         if root not in known_terms:
#             known_terms.add(root)
#             print(root.term)

#             for node in root.downstream:
#                 if node.upstream.issubset(known_terms):
#                     print(' + '.join([n.term for n in node.upstream]), node.term)
        






        
        

    #     if wid[0:3] != 'deu' or wid2[0:3] != 'deu':
    #         continue

    #     # if wid.count(' ') > 1 or wid2.count(' ') > 1 or '-' in wid2:
    #     #     continue

    #     n1 = Node.get(wid)
    #     n2 = Node.get(wid2)

    #     if rel == "rel:has_derived_form":
    #         n1.has_derived_form.add(n2)
    #         n2.is_derived_from.add(n1)
    #     elif rel == "rel:etymological_origin_of":
    #         n1.has_derived_form.add(n2)
    #         n2.is_derived_from.add(n1)

    # allnodes = Node.nodes.values()
    # # snodes = sorted(allnodes, key=lambda n: -len(n.has_derived_form))

    # for n in allnodes: 
    #     if len(n.is_derived_from) < 2:
    #         continue
    #     terms = [n2.term for n2 in n.is_derived_from]
        # print(f"{n.term} comes from {', '.join(terms)}")

    # items = []
    # known = set()

    # node = [n for n in snodes if n.term == 'soft'][0]
    # while True:
    #     items.append({ 'data': { 'id': node.engid }})
    #     known.add(node.engid)

    #     # for n in node.is_derived_from:
    #     #     if not n.engid in known:
    #     #         items.append({ 'data': { 'id': n.engid }})
    #     #         known.add(n.engid)
    #     #     items.append({ 'data': { 'id': n.engid + ' - ' + node.engid, 'source': n.engid, 'target': node.engid }})

    #     #     for n2 in n.is_derived_from:
    #     #         if not n2.engid in known:
    #     #             items.append({ 'data': { 'id': n2.engid }})
    #     #             known.add(n2.engid)
    #     #         items.append({ 'data': { 'id': n2.engid + ' - ' + n.engid, 'source': n2.engid, 'target': n.engid }})

    #     for n in node.has_derived_form:
    #         if not n.engid in known:
    #             items.append({ 'data': { 'id': n.engid }})
    #             known.add(n.engid)
    #         items.append({ 'data': { 'id': node.engid + ' - ' + n.engid, 'source': node.engid, 'target': n.engid }})

    #         for n2 in n.has_derived_form:
    #             if not n2.engid in known:
    #                 items.append({ 'data': { 'id': n2.engid }})
    #                 known.add(n2.engid)
    #             items.append({ 'data': { 'id': n.engid + ' - ' + n2.engid, 'source': n.engid, 'target': n2.engid }})

    #     break


    # # for node in snodes[:1000]:
    # #     items.append({ 'data': { 'id': node.term }})
    # #     known.add(node.wid)


    # # for node in snodes[:1000]:
    # #     for n in node.has_derived_form:
    # #         if n.wid in known:
    # #             items.append({ 'data': { 'id': node.term + ' - ' + n.term, 'source': node.term, 'target': n.term }})

    # print(json.dumps(items))

    # # for node in snodes[:20]:
    # #     # print(node.term + "\t" + str(len(node.has_derived_form)))
    # #     if node.term == "wort":
    # #         print(node.term + "\t" + str(len(node.has_derived_form)), sorted([n.term for n in node.has_derived_form], key=lambda x: -len(x)))