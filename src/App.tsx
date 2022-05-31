import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication';
import { Lang } from './modules/language/lang';
import { LangFr } from './modules/language/langFr';
import { LangEn } from './modules/language/langEn';
import './styles/app.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './pages/404';
import Home from './pages/Home';
import { ProtectedPage } from './components/authentication/Protected';

/**
 * @interface StateApp
 * @author Gilles Cédric
 * @description this interface is the State definition for the App class
 */
interface StateApp {
  vocabulary: Lang
}

/**
 * @class App
 * @author Gilles Cédric
 * @description this class is the App class, the main class of the application
 * @extends React.Component
 * @exports
 * @default
 */
export default class App extends React.Component<{}, StateApp> {

  constructor(props: {}) {
    super(props)
    this.state = {
      vocabulary: this.vocabularies[0]
    }
  }

  /**
   * @property vocabularies
   * @description this object contains all the languages of the application
   * @type {Lang[]} An array which containing all the lang fot the application
   * @private
   * @readonly
   */
  private readonly vocabularies: Lang[] = [
    new LangFr(),
    new LangEn()
  ]

  /**
   * @override
   * @returns {JSX.Element}
   */
  render = (): JSX.Element => {
    return <>
      <Routes>
        <Route path='/' element={<Navigate to={'/dashboard'} />} />
        <Route path='/authenticate' element={<Authentication vocabulary={this.state.vocabulary} />} />
        <Route path='/dashboard' element={
          <ProtectedPage>
            <Home updater={(index: number) => this.setState({ vocabulary: this.vocabularies[index]})} vocabulary={this.state.vocabulary} />
          </ProtectedPage>
        } />
        <Route path='*' element={
          <ProtectedPage>
            <NotFound vocabulary={this.state.vocabulary} />
          </ProtectedPage>
        } />
      </Routes>
    </>
  }

}