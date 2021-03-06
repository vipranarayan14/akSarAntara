import { expect } from 'chai';
import { makeFromSchemeTree } from '../../../src/make-scheme-tree';
import { manageSchemes } from '../../../src/scheme/manage-schemes';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';

const schemesManager = manageSchemes([vTranslitSchemeItrn]);
const getSchemeFor = schemesManager.get;

describe('fromSchemeTree  for "Itrn" scheme', () => {
  const state = {
    aksharaIndex: 0,
    maxTokenLength: 0,
    tokenLengths: [],
  };

  const fromScheme = getSchemeFor('Itrn');

  const { fromSchemeTree } = makeFromSchemeTree(fromScheme, state);

  it('should be an object literal', () => {
    expect(fromSchemeTree).to.be.an('object');
  });

  it('should contain all of these consonants - [`k`, `~n`, `N^`, `Dh`, `y`, `L`, `w`, `shh`]', () => {
    expect(fromSchemeTree).to.contain.all.keys([
      'k',
      '~n',
      'N^',
      'Dh',
      'y',
      'L',
      'w',
      'shh',
    ]);
  });

  it('should contain all of these vowelMarks - [`A`, `aa`, `U`, `RRi`, `R^i`, `au`]', () => {
    expect(fromSchemeTree).to.contain.all.keys([
      'A',
      'aa',
      'U',
      'RRi',
      'R^i',
      'au',
    ]);
  });

  it('should contain all of these symbols - [`0`, `4`, `|`, `.a`, `.m`]', () => {
    expect(fromSchemeTree).to.contain.all.keys(['0', '4', '|', '.a', '.m']);
  });

  it('should not contain any of these - [``, `ka`, `na`]', () => {
    expect(fromSchemeTree).not.to.contain.any.of.keys(['']);
  });

  it('should return an object when char is looked up', () => {
    expect(fromSchemeTree['~N']).to.be.an('object');
  });

  it('should return the details of the given char', () => {
    expect(fromSchemeTree['N^']).to.deep.equal({
      aksharaIndex: 'deadConsonants#4',
      alternateIndex: 1,
      char: 'N^',
      type: 'deadConsonants',
    });
  });
});
