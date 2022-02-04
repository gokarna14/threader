import pandas as pd
from sklearn.model_selection import train_test_split
import pickle
from sklearn import metrics
from sklearn.ensemble import RandomForestClassifier
import os


class Model:
  n_estimators = 385
  data = pd.read_csv(os.path.dirname(os.path.realpath(__file__)) + "/Datasets/CSV/PP/CleanPPData.csv")
  columns = [ 'TIPI1', 'TIPI2', 'TIPI3', 'TIPI4', 'TIPI5', 'TIPI6', 'TIPI7', 'TIPI8', 'TIPI9', 'TIPI10']
  models = 0

  @staticmethod
  def feedModel(model_folder_path, what_to_fed):
    what_to_fed = 'TIPI' + str(what_to_fed)
    Model.models = pickle.load(open(model_folder_path + '/RFC_' + what_to_fed +'.sav', 'rb'))
    print(f'Feeded: {model_folder_path}/RFC_{what_to_fed}.sav')

  @staticmethod
  def reCreateAllModels():
    for i in Model.columns:
      temp = Model.columns[:]
      temp.remove(i)
      dataOnlyNeeded = Model.data.drop(temp, axis=1)
      print(f'Dropped Columns: {temp}')
      print(f'Remaining Columns: {dataOnlyNeeded.columns}')
      print('Performing train/test split ...')
      x = dataOnlyNeeded.drop(i, axis=1)
      y = dataOnlyNeeded[i]
      x, x_test, y, y_test = train_test_split(x,y, stratify=y, test_size=0.15, random_state=42)
      print(f'X Columns: {dataOnlyNeeded.drop(i, axis=1).columns}')
      print(f'Y Column: {i}')
      print(f'To predict: {i}\nFitting RFC model ...')
      RFC=RandomForestClassifier(
      n_estimators=Model.n_estimators,
      max_depth = 100
      )
      RFC.fit(x, y)
      pickle.dump(RFC, open(os.path.dirname(os.path.realpath(__file__)) + '/Datasets/Model/PP/RFC_' + i +'.sav', 'wb'))
      print(f'Saved file: Model/RFC_/{i}.sav')

  @staticmethod
  def predict(predict_code, to_predict = []): # to predict as list
    temp ={}
    for i, j in zip(Model.data.columns, to_predict):
      if i not in Model.columns:
        temp[i] = j
      to_predict = pd.DataFrame(temp, index=[0])
    if predict_code not in [i for i in range(1, 11)]:
      print('Not a valid code !')
      return
    print(f'To predict: TIPI{ str(predict_code)}\nFeeding Model')
    Model.feedModel(os.path.dirname(os.path.realpath(__file__)) + '/Datasets/Model/PP', predict_code)
    prediction = Model.models[predict_code-1].predict(to_predict)
    return (int(prediction[0]))

# Model.reCreateAllModels()
# Model.feedModels('Model/PP')

a = Model.data.drop(Model.columns, axis = 1).iloc[[0]].values[0]
print(Model.predict(1, list(a)))