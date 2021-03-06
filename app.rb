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
  File.delete("processed.c")

  trimmed_contents = ""

  gogo_gadget = false

  contents.each_line do |line|
    if !gogo_gadget && line.include?("/*")
      gogo_gadget = true
      next
    end

    if line.include? "//MACRONATOR END"
      break
    end

    if gogo_gadget
        trimmed_contents += line
    elsif line.include? "int main"
        gogo_gadget = true;
    end
  end

   trimmed_contents
end