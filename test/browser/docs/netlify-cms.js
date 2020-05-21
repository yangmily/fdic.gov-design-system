/* eslint-disable handle-callback-err */
/* eslint-disable no-undef */

describe( 'Netlify CMS', () => {

  let loginButton;

  beforeEach( () => {
    browser.reloadSession();
  } );

  describe( 'Editing the homepage', () => {

    beforeEach( () => {
      browser.url( '/design-system/admin/#/collections/generic-pages/entries/home' );
      loginButton = browser.react$( 'LoginButton' );
    } );

    it( 'should load the login page with a login button', () => {
      loginButton.waitForDisplayed();
      expect( loginButton ).toExist();
    } );

    it( 'should allow the user to log in', () => {
      loginButton.waitForDisplayed();
      loginButton.click();
      const editorContainer = browser.react$( 'EditorContainer' );
      editorContainer.waitForDisplayed();
      expect( editorContainer ).toExist();
    } );

    it( 'should properly render a preview of a page', () => {
      loginButton.waitForDisplayed();
      loginButton.click();
      // The homepage's body field
      const pageBodyField = $( '#nc-root #body-field-1' );
      pageBodyField.waitForDisplayed();
      pageBodyField.clearValue();
      pageBodyField.setValue( 'browser tests are fun' );
      // The preview pane is an iframe
      browser.switchToFrame( $( 'iframe' ) );
      const previewPane = $( 'body' );
      expect( previewPane ).toHaveTextContaining( 'browser tests are fun' );
    } );

  } );

  describe( 'Editing a component page', () => {

    beforeEach( () => {
      browser.url( '/design-system/admin/#/collections/components/entries/buttons' );
      // Make the browser a little wider than normal to prevent the "show details" tabs
      // from triggering their mobile media queries
      browser.setWindowSize( 1400, 800 );
      loginButton = browser.react$( 'LoginButton' );
    } );

    it( 'should properly render a preview of a component page', () => {
      loginButton.waitForDisplayed();
      loginButton.click();
      // The button page's title field
      const pageTitleField = $( '#nc-root #title-field-1' );
      pageTitleField.waitForDisplayed();
      pageTitleField.clearValue();
      pageTitleField.setValue( 'component pages are the best' );
      // The preview pane is an iframe
      browser.switchToFrame( $( 'iframe' ) );
      const previewPane = $( 'body' );
      expect( previewPane ).toHaveTextContaining( 'component pages are the best' );
    } );

    it( 'should support switching between the various "show details" tabs', () => {
      loginButton.waitForDisplayed();
      loginButton.click();
      // Wait for the editor to load
      const editorContainer = browser.react$( 'EditorContainer' );
      editorContainer.waitForDisplayed();
      // The preview pane is an iframe
      browser.switchToFrame( $( 'iframe' ) );
      const detailsButton = $( 'button=Show details' );
      detailsButton.click();
      const implementationButton = $( 'a=Implementation' );
      expect( implementationButton ).toBeDisplayed();
      implementationButton.click();
      // Move one level up the DOM tree
      const implementationButtonParent = implementationButton.$( '..' );
      expect( implementationButtonParent ).toHaveClassContaining( 'selected' );
    } );
  } );

} );