import React from 'react';
import Authentication from './pages/Authentication';
import { Lang } from './modules/language/lang';
import { LangFr } from './modules/language/langFr';
import { LangEn } from './modules/language/langEn';
import './styles/app.scss'

interface PropsApp {

}

interface StateApp {
  vocabulary: Lang
}

export default class App extends React.Component<PropsApp, StateApp> {

  constructor(props: PropsApp) {
    super(props)
    this.state = {
      vocabulary: this.vocabularies[0]
    }
  }

  private readonly updateLanguage = (index: number) => {
    this.setState({vocabulary: this.vocabularies[index]})
  }

  private readonly vocabularies: Lang[] = [
    new LangFr(),
    new LangEn()
  ]

  render = () => {
    return <div className="App">
        <Authentication vocabulary={this.state.vocabulary} />
      </div>
  }

}