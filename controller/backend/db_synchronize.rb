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

# load graph_label
get '/graph_label/:id' do
  GraphLabel.find(params[:id].to_i).to_json
end

################################
# synchronize: network_element #
################################

post '/network_element/new' do
  ne = GraphLabel.find(params[:graph_label].to_i).network_elements.create(
    :identifier => params[:identifier],
    :ne_type => params[:ne_type]
  )
  ne.features.create(
    :avp_attribute => "position_x",
    :value => params[:position_x],
    :priority => 1,
    :is_request => 0
  )
  ne.features.create(
    :avp_attribute => "position_y",
    :value => params[:position_y],
    :priority => 1,
    :is_request => 0
  )
  ne.to_json
end

put '/network_element/:id' do
  ne = NetworkElement.find(params[:id].to_i)
  if params[:todo] == 'move'
    ne.features.where(:avp_attribute => 'position_x').update(:value => params[:position_x])
    ne.features.where(:avp_attribute => 'position_y').update(:value => params[:position_y])
  else
    ne.update(
      :identifier => params[:identifier],
      :ne_type => params[:ne_type]
    )
  end
end

delete '/network_element/:id' do
  NetworkElement.find(params[:id].to_i).delete_network_element()
end

##################################
# synchronize: network_interface #
##################################

post '/network_interface/new' do
  
end

put '/network_interface/:id' do
  
end

delete '/network_interface/:id' do
  
end

#########################
# synchronize: resource #
#########################

post '/resource/new' do
  
end

put '/resource/:id' do
  
end

delete '/resource/:id' do
  
end

########################
# synchronize: feature #
########################

post '/feature/new' do
  NetworkElement.find(params[:network_element].to_i).features.create(
    :avp_attribute => params[:avp_attribute],
    :value => params[:value],
    :priority => params[:priority].to_i,
    :is_request => params[:is_request].to_i
  ).to_json
end

put '/feature/:id' do
  
end

delete '/feature/:id' do
  
end
