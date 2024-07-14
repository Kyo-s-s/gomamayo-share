require 'mecab'

module GomamayoChecker
  # rubocop:disable Metrics/MethodLength
  def mecab_parse(str)
    tagger = MeCab::Tagger.new
    tagger
      .parse(str)
      .split(/\R/)[0...-1] # Ignore EOS.
      .map do |line|
        sep = line.split(/[\t|,]/).map { |w| w == '*' ? nil : w }
        {
          surface: sep[0],
          reading: sep[8].nil? ? sep[0] : sep[8] # FIXME: ー
        }
      end
  end
  # rubocop:enable Metrics/MethodLength

  def gomamayo_check(str)
    mecab_parse(str).each_cons(2).filter do |first, second|
      first[:reading][-1] == second[:reading][0]
    end
  end

  def gomamayo?(str)
    !gomamayo_check(str).empty?
  end
end
