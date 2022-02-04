import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics, svm
from matplotlib import pyplot as plt
import numpy as np
import pickle
import os
import seaborn as sns
import sys

class Model:
  mnb, svm_ = 21, 76
  oppWords = pd.read_csv(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/CSV/opposite.csv')
  unwanted = pd.read_csv(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/CSV/unwanted.csv')
  exclude = list(unwanted['prepositions'].unique() )+ list(unwanted['pronouns'].unique())
  reveres = ['not', 'hardly', 'never']
  mertircs = {
      'MTX':['accuracy', 
             'balanced_accuracy', 
             'f1', 
             'precision',
             ],
      'MNB':[],
      'SVM':[],
  }

  @staticmethod
  def store_metrics(y_true, y_pred, what, save = False): # https://scikit-learn.org/stable/modules/model_evaluation.html
    if what in ['MNB', "SVM", 'AVG']:
      Model.mertircs[what] = []
      Model.mertircs[what].append(metrics.accuracy_score(y_true, y_pred))
      Model.mertircs[what].append(metrics.balanced_accuracy_score(y_true, y_pred))
      Model.mertircs[what].append(metrics.f1_score(y_true, y_pred, average='weighted'))
      Model.mertircs[what].append(metrics.precision_score(y_true, y_pred, average='weighted'))
    else:
      print('Invalide command !')
    if save:
      pd.DataFrame(Model.mertircs).to_csv('SAscore.csv', index=False)
      print('SAscore.csv written !' )
    return sum(Model.mertircs[what])
  
  @staticmethod
  def oppFilter(sentence, do):
    if not do:
      return sentence
    new_sentence =''
    for word in sentence.split(' '):
      if len(word) > 1 and word[0] == "!":
        if len(Model.oppWords[Model.oppWords['word'] == word[1:]]) > 0:
          word = Model.oppWords[Model.oppWords['word'] == word[1:]]['opposite'].array[0]
        elif len(Model.oppWords[Model.oppWords['opposite'] == word[1:]]) > 0:
          word = Model.oppWords[Model.oppWords['opposite'] == word[1:]]['word'].array[0]
        else:
          word = word[1:]
      new_sentence += (str(word) + " ")
    return new_sentence[:-1]

  @staticmethod
  def filter_sentence(sentence):
    notFilter = False
    sentence = sentence.lower()
    new_sentence ='' 
    for word in sentence.split(' '):
      nw = ''
      for i in word:
        if i.isalpha():
          nw += i
      word = nw
      if word not in Model.exclude:
        if word in Model.reveres:
          new_sentence += '!'
          notFilter = True
        else:
          new_sentence += (word + " ")
    return Model.oppFilter(new_sentence[:-1], notFilter)

  @staticmethod
  def filter_df(df, to_filter_column, new_column):
    df[new_column] = df[to_filter_column]
    i = -1
    for sentence in df[to_filter_column]:
      i += 1
      df[new_column][i] = Model.filter_sentence(sentence)
    return df
  
  @staticmethod
  def predict(statement, details=False):
    originalStatement = statement
    filteredStatement = ''
    try:
      if details:
        print(f'Input: "{statement}"')
      statement = Model.filter_sentence(statement)
      filteredStatement = statement
      if details:
        print(f'Filtered Input: {statement}')
      svm_prob = Model.SVM_model.predict_proba(Model.vec.transform([statement]))[0]
      mnb_prob = Model.MNB_model.predict_proba(Model.vec.transform([statement]))[0]
      l = len(statement.split(' '))
      if l<3:
        avg = avg = (svm_prob*Model.svm_ + mnb_prob*Model.mnb)/(Model.svm_+Model.mnb)
      else:
        avg = svm_prob
      classes = Model.MNB_model.classes_
      res = classes[list(avg).index(avg.max())].upper()
      if details:
        print(f'THE OVERALL SENTIMENT OF GIVEN STATEMENT IS "{res}".\n\nDetails:')
        print(f'SENTIMENT : MNB, SVM, AVG')
        for i in range(len(classes)):
          print(f'{classes[i]} : {format(mnb_prob[i]*100,".4f")}%, {format(svm_prob[i]*100,".4f")}%, {format(avg[i]*100,".4f")}%')
        print("----------------------------\n")
    except AttributeError:
      print('Model is not yet generated.')
      return
    except TypeError:
      print('Model is not yet generated.')
      return

    return {
        'Statement': originalStatement,
        'FilteredStatement': filteredStatement,
        'classes': list(classes),
        'MNB' : list(mnb_prob),
        'SVM' : list(svm_prob),
        'AVG' : list(avg),
        'res' : res,
        'prob': avg.max()
    }

  @staticmethod
  def updateModelVec(MNB_model, SVM_model, vec, save = False):
    Model.MNB_model = MNB_model
    Model.SVM_model = SVM_model
    Model.vec = vec
    if save:
      pickle.dump(Model, open('Class/Model.sav', 'wb'))

  @staticmethod
  def train_test_split_(xColumn, yColumn):
    x = Model.statementsDF[xColumn]
    y = Model.statementsDF[yColumn]
    Model.x, Model.x_test, Model.y, Model.y_test = train_test_split(x,y, stratify=y, test_size=0.15, random_state=22)

  @staticmethod
  def vectorize():
    Model.vec = CountVectorizer(stop_words='english')
    Model.x_SVM = Model.vec.fit_transform(Model.x)
    Model.x_test_SVM = Model.vec.transform(Model.x_test)
    Model.x_MNB = Model.vec.fit_transform(Model.x).toarray()
    Model.x_test_MNB = Model.vec.transform(Model.x_test).toarray()
    pickle.dump(Model.vec, open(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/vectorizer.sav', 'wb'))


  @staticmethod
  def generateModel(df, xColumn, yColumn): # x, y -> statements, sentiment
      print('Filtering the DataFrame ...')
      Model.statementsDF = Model.filter_df(df, xColumn, 'New' + xColumn)
      print('Performing Train/Test split ...')
      Model.train_test_split_('New' + xColumn, yColumn)
      print('Vectorizing ...')
      Model.vectorize()

      print('Generating SVM Model...')
      modelSVM = svm.SVC(kernel='linear', probability=True)
      modelSVM.fit(Model.x_SVM, Model.y)
      pickle.dump(modelSVM, open(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/modelSVM.sav', 'wb'))
      print('Generating MNB Model...')
      modelMNB = MultinomialNB()
      modelMNB.fit(Model.x_MNB, Model.y)
      pickle.dump(modelMNB, open(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/modelMNB.sav', 'wb'))

      Model.updateModelVec(modelMNB, modelSVM, Model.vec)

      print('Calculationg model scores ...')
      Model.store_metrics(list(Model.y_test), list(Model.SVM_model.predict(Model.vec.transform(Model.x_test))), "SVM")
      Model.store_metrics(list(Model.y_test), list(Model.MNB_model.predict(Model.vec.transform(Model.x_test))), "MNB")
      ypred = [Model.predict(ss)['res'].lower() for ss in list(Model.x_test)]
      Model.store_metrics(list(Model.y_test), ypred, "AVG", True)

  def necessary_lib_files():
    lib_files = ['from sklearn.model_selection import train_test_split',
           'from sklearn.feature_extraction.text import CountVectorizer',
           'from sklearn.naive_bayes import MultinomialNB',
           'from sklearn import svm',
           'import pickle',
           'import pandas as pd',
           'CSV/opposite.csv',
           'CSV/unwanted.csv',
           'Folder: Model',
           ]
    print(f'Necessary items:\n{lib_files}')
  
  @staticmethod
  def load_model_vectorizer(MNB_path, SVM_path, vec_path):
    Model.vec = pickle.load(open(vec_path, 'rb'))
    Model.MNB_model = pickle.load(open(MNB_path, 'rb'))
    Model.SVM_model = pickle.load(open(SVM_path, 'rb'))


"""# For re-generating model"""
# Model.generateModel(pd.read_csv(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/CSV/statementsWithoutLove.csv'), 'Statements', 'Sentiment')


"""# Feeding saved MNB, SVM and vectorizer to Model"""
Model.load_model_vectorizer(os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/modelMNB.sav', os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/modelSVM.sav', os.path.dirname(os.path.realpath(__file__)) +'/Datasets/Model/vectorizer.sav')

res = str(Model.predict(sys.argv[1]))
res = res.replace("'", '"')

print(res)

