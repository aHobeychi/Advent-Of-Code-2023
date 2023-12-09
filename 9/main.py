f = open('9/data.txt')
data = [list(map(int, row.strip().split())) for row in f]

def get_val(sequence):
  if len(set(sequence)) == 1:
    return sequence[0]

  next_number = get_val([b - a for a, b in zip(sequence, sequence[1:])])
  return sequence[-1] + next_number

part1 = sum(get_val(sequence) for sequence in data)
print(f'Part 1: {part1}')

part2 = sum(get_val(sequence[::-1]) for sequence in data)
print(f'Part 2: {part2}')