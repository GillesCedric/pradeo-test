import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication';
import { Lang } from './modules/language/lang';
import { LangFr } from './modules/language/langFr';
import { LangEn } from './modules/language/langEn';
import './styles/app.scss'
import NotFound from './pages/404';
import Home from './pages/Home';
import { ProtectedPage } from './components/authentication/Protected';


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
    this.setState({ vocabulary: this.vocabularies[index] })
  }

  private readonly vocabularies: Lang[] = [
    new LangFr(),
    new LangEn()
  ]

  render = () => {
    return <div className="App">
      <Routes>
        <Route path='/authenticate' element={<Authentication vocabulary={this.state.vocabulary} />} />
        <Route path='/dashboard' element={
          <ProtectedPage>
            <Home vocabulary={this.state.vocabulary} />
          </ProtectedPage>
        } />
        <Route path='*' element={
          <ProtectedPage>
            <NotFound vocabulary={this.state.vocabulary} />
          </ProtectedPage>
        } />
      </Routes>
    </div>
  }

}