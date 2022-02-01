from pickle import TRUE
import pandas as pd
from matplotlib import pyplot as plt
import numpy as np
import os

def uq(l1, l2):
    print(f'l1: {len(l1)}\tl1: {len(l2)}')
    r = [[], []]
    for i in range(len(l1)):
        if l1[i] not in r[0]:
            r[0].append(l1[i])
            r[1].append(l2[i])
    print(f'l1: {len(r[0])}\tl1: {len(r[1])}\n---------------')
    return r

statementsDF = pd.read_csv(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/CSV/RANALYSIS.csv')

fig = plt.figure()
ax = fig.add_subplot(111)

ymax = statementsDF['precision'].max()
xmax = list(statementsDF[statementsDF['precision'] == statementsDF['precision'].max()]['M.S'])[0]

bbox_props = dict(boxstyle="square,pad=0.3", fc="w", ec="k", lw=0.72)
arrowprops=dict(arrowstyle="->",connectionstyle="angle,angleA=0,angleB=60")

text= "x={:.3f}, y={:.3f}".format(xmax, ymax)
ax.annotate(text, xy=(xmax, ymax), arrowprops=arrowprops, bbox=bbox_props, xytext=(0.94,0.96))

ax.plot(statementsDF['M.S'], statementsDF['precision'])

plt.show()
