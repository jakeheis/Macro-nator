require 'rubygems'
require 'sinatra'
require 'json'

configure do
  set :public_folder, Proc.new { File.join(root, "static") }
end

get '/' do
  erb :home
end

post '/convertify' do
  File.open("processed.c", 'w') { |file| file.write(params[:file]) }
  contents = `gcc -E -CC processed.c`
  # File.delete("processed.c")

  trimmed_contents = ""

  gogo_gadget = false

  lines_ago = 0;
  contents.each_line do |line|
    puts "LIEN LINE LINE #{line}"
    if line.include? "//MACRONATOR START"
      puts "MOOHAHAHAHA"
      lines_ago = 1;
      next
    end

    if lines_ago == 1
      lines_ago += 1
      next
    end

    if line.include? "//MACRONATOR END"
      break
    end

    if lines_ago == 2
        trimmed_contents += line
    elsif line.include? "int main"
        gogo_gadget = true;
    end
  end

  puts "trimmy trim trim trim #{trimmed_contents}"

  # contents.split("\n")
   # {:key1 => "contents"}.to_json
   # argarr = trimmed_contents.split("asdf")
   # puts "O the hero #{argarr[0]}"

   trimmed_contents
end