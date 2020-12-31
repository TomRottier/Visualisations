%% Plot in 3D Lorenz system of non-linear differential equations
% xprime = sigma * (y - x);
% yprime = x * (rho - z) - y);
% zprime = x * y - beta * z;

dt = 0.001;     % 0.001
tfinal = 100;   % 100
n = tfinal / dt;
tspan = 0:dt:tfinal;
eps = 2;        % 2

x0 = 8;         % 8
y0 = 1;         % 1
z0 = 1;         % 1
x = [x0,y0,z0];

x0_eps = x0 - eps; 
y0_eps = y0; 
z0_eps = z0 - eps/5; 
x_eps = [x0_eps,y0_eps,z0_eps];

sigma = 10;     % 10
rho = 28;       % 28
beta = 8/3;     % 8/3

diff_eqs = @(t,x) [sigma*(x(2) - x(1));
                   x(1) * (rho - x(3)) - x(2);
                   x(1) * x(2) - beta * x(3)];

[t,y] = ode45(diff_eqs,tspan,x);
[t_eps,y_eps] = ode45(diff_eqs,tspan,x_eps);

xlims = [min([y(:,1); y_eps(:,1)]), max([y(:,1); y_eps(:,1)])];
ylims = [min([y(:,2); y_eps(:,2)]), max([y(:,2); y_eps(:,2)])];
zlims = [min([y(:,3); y_eps(:,3)]), max([y(:,3); y_eps(:,3)])];

%% Plot
figure(1)
set(figure(1), 'WindowStyle', 'docked')
set(figure(1), 'color','w')
set(gca,'visible','off')
view(18,19)
xlim(xlims)
ylim(ylims)
zlim(zlims)
hold on

plot = animatedline('LineWidth',0.7,'Color','k');
for i = 1:length(y)    
    addpoints(plot,y(i,1),y(i,2),y(i,3))
    drawnow limitrate
end
hold off

% Points folow their path
% figure(2)
% clf
% plot3(y(:,1),y(:,2),y(:,3),'k')
% view(18,19)
% xlim(xlims)
% ylim(ylims)
% zlim(zlims)
% set(gca, 'xtick',[])
% set(gca, 'ytick',[])
% set(gca, 'ztick',[])
% hold on
% 
% temp = animatedline('Marker', 'o', 'Color', 'r','MarkerFaceColor', 'r');
% temp_eps = animatedline('Marker', 'o', 'Color', 'b','MarkerFaceColor', 'b');
% 
% for i = 1:length(y)
%     clearpoints(temp)
%     clearpoints(temp_eps)
%     addpoints(temp,y(i,1),y(i,2),y(i,3));
%     addpoints(temp_eps,y_eps(i,1),y_eps(i,2),y_eps(i,3));
%     drawnow limitrate
%     if i == 1 
%         pause(2.0)
%     end
% end

% Points trace their paths
figure(3)
set(figure(3), 'WindowStyle', 'docked')
set(figure(3), 'color','w')
set(gca, 'visible', 'off')
view(18,19)
xlim(xlims)
ylim(ylims)
zlim(zlims)
hold on
colour = 'k';
colour_eps = 'b';

line = animatedline('LineWidth',0.7,'Color', colour);
line_eps = animatedline('LineWidth',0.7,'Color', colour_eps);

head = animatedline('Marker', 'o', 'Color', colour,...
                    'MarkerFaceColor', colour);
head_eps = animatedline('Marker', 'o', 'Color', colour_eps,...
                        'MarkerFaceColor', colour_eps);

for i = 1:1:length(y)
    clearpoints(head)
    clearpoints(head_eps)
    addpoints(line  ,y(i,1),y(i,2),y(i,3));
    addpoints(line_eps,y_eps(i,1),y_eps(i,2),y_eps(i,3));
    addpoints(head,y(i,1),y(i,2),y(i,3));
    addpoints(head_eps,y_eps(i,1),y_eps(i,2),y_eps(i,3));
    drawnow limitrate
    if i == 1
        pause(2.0)
    end
%     camorbit(0.1,0,'data',[0 0 1])
end
