import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import ParameterGrid
from sklearn import metrics
from sklearn.svm import SVR
from sklearn.model_selection import train_test_split
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.datasets import make_regression
from sklearn import linear_model

names = [ 'explained_variance',
  'max_error',
  'neg_mean_absolute_error',
  'neg_mean_squared_error',
  'neg_root_mean_squared_error',
  'neg_median_absolute_error',
  'r2',
  'neg_mean_poisson_deviance',
  'neg_mean_absolute_percentage_error',
  ]
scoresDict = {'Metric': names}
for depth in range(290, 10001):
  print(f'Depth: {depth}\nGenerating RFR model ...')

  rfr = RandomForestRegressor(max_depth=depth)
  rfr.fit(x, y)
  
  # lassoReg = linear_model.Lasso(alpha=0.1)
  # lassoReg.fit(x, y)
  y_true = list(y_test)
  y_pred = list(rfr.predict(x_test))
  scores = []
  scores.append(metrics.explained_variance_score(y_true, y_pred))
  scores.append(metrics.max_error(y_true, y_pred))
  scores.append(metrics.mean_absolute_error(y_true, y_pred))
  scores.append(metrics.mean_squared_error(y_true, y_pred))
  scores.append(metrics.mean_squared_log_error(y_true, y_pred))
  scores.append(metrics.median_absolute_error(y_true, y_pred))
  scores.append(metrics.r2_score(y_true, y_pred))
  scores.append(metrics.mean_poisson_deviance(y_true, y_pred))
  scores.append(metrics.mean_absolute_percentage_error(y_true, y_pred))
  scoresDict['D' + str(depth)] = scores
  pd.DataFrame(scoresDict).to_csv('ScoresFrom290.csv', index=False)
  print(f'CSV written of depth: {depth}\n')