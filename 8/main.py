import numpy as np
import itertools

mapping = {
    "L": 0,
    "R": 1
}

f = open('8/data.txt', 'r')
data = f.read().strip().split('\n')
f.close()

sequence_order = itertools.cycle(data[0])

paths = {}
for line in data[2:]:
    split_line = line.split(' = ')
    paths[split_line[0]] = split_line[1][1:-1].split(', ')

current_line = 'AAA'
number_of_jumps = 0
while current_line != 'ZZZ':
    current_line = paths[current_line][mapping[sequence_order.__next__()]]
    number_of_jumps += 1

print(f'Number of jumps till ZZZ: {number_of_jumps}')

def ends_with_char(node, char):
    return node[-1] == char


def both_nodes_end_with_z(node):
    nodes = paths[node]
    return ends_with_char(node=nodes[0], char='Z') & ends_with_char(node=nodes[0], char='Z') 

starting_nodes = []
for x in list(paths.keys()):
    if ends_with_char(x, 'A'):
        starting_nodes.append(x)

jumps = []
sequence_order = itertools.cycle(data[0])
for starts in starting_nodes:
    current_line = starts
    number_of_jumps = 0
    sequence_order = itertools.cycle(data[0])
    while not ends_with_char(current_line, 'Z'):
        current_line = paths[current_line][mapping[sequence_order.__next__()]]
        number_of_jumps += 1

    jumps.append(number_of_jumps)

print(f'Number of jumps till **Z: {np.lcm.reduce(jumps)}')