require "rubygems"
require "sinatra"
require "cloudnets"
require "sinatra/cross_origin"

set :bind, '0.0.0.0'
disable :protection

configure do
  enable :cross_origin
end

############################
# synchronize: graph_label #
############################

# create new graph_label
post '/graph_label/new' do
  GraphLabel.create(
    :role_identifier => params[:role_identifier],
    :graph_type => params[:graph_type],
    :graph_nr => params[:graph_nr],
    :graph_tag => params[:graph_tag],
    :v_net_identifier => params[:v_net_identifier]
  ).to_json
end

# modify graph_label
put '/graph_label/:id' do
  GraphLabel.update(
    params[:id].to_i,
    :role_identifier => params[:role_identifier],
    :graph_type => params[:graph_type],
    :graph_nr => params[:graph_nr],
    :graph_tag => params[:graph_tag],
    :v_net_identifier => params[:v_net_identifier]
  )
end

# delete graph_label
delete '/graph_label/:id' do
  GraphLabel.destroy(params[:id].to_i)
end
