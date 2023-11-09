const { 
    buttonsToForm, 
    addToBoard, 
    startGame, 
    randomFlag, 
    addToArray, 
    wrongCountries, 
    shuffle, 
    createButtons, 
    handleButtonClick, 
    restartGame
} = require('./index');

describe('Test if the functions exist', () => {
    test('buttonsToForm function exists', () => {
      expect(buttonsToForm).toBeDefined();
    });
  
    test('addToBoard function exists', () => {
      expect(addToBoard).toBeDefined();
    });
  
    test('startGame function exists', () => {
      expect(startGame).toBeDefined();
    });
  
    test('randomFlag function exists', () => {
      expect(randomFlag).toBeDefined();
    });
  
    test('addToArray function exists', () => {
      expect(addToArray).toBeDefined();
    });
  
    test('wrongCountries function exists', () => {
      expect(wrongCountries).toBeDefined();
    });
  
    test('shuffle function exists', () => {
      expect(shuffle).toBeDefined();
    });
  
    test('createButtons function exists', () => {
      expect(createButtons).toBeDefined();
    });
  
    test('handleButtonClick function exists', () => {
      expect(handleButtonClick).toBeDefined();
    });
  
    test('restartGame function exists', () => {
      expect(restartGame).toBeDefined();
    });
  });
