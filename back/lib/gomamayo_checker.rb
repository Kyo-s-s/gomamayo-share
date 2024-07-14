require 'mecab'

module GomamayoChecker
  def mecab_parse(str)
    tagger = MeCab::Tagger.new
    tagger.parse(str)
  end
end
